from comet_ml.api import API
from comet_ml import APIExperiment

import pandas as pd
import numpy as onp 
from scipy import stats

from datetime import datetime
import json
import ast
import subprocess

from metrics import *
from plot_utils import comparative_line_plot, line_plot

import matplotlib.pyplot as plt


comet_api = API(api_key="wOduPvxJkmBFNXJIbvZmgDwBp")

content = r'''\documentclass{article}
\usepackage[english]{babel}
\usepackage[letterpaper, margin=1in]{geometry}

\usepackage{amsmath}
\usepackage{graphicx}
\usepackage[colorlinks=true, allcolors=blue]{hyperref}
\usepackage{array,booktabs,ragged2e}

\usepackage[table]{xcolor}
\setlength{\arrayrulewidth}{0.5mm}
\setlength{\tabcolsep}{18pt}

\title{Matador Portfolio Analysis Report}
\author{Understanding Your Portfolio's Performance on a Deeper Level}

\begin{document}

\maketitle

\section*{Summary Statistics}

\begin{table}[h!]
\begin{center}
{\rowcolors{2}{}{gray!20}
\\newcolumntype{R}[1]{>{\RaggedLeft\arraybackslash}p{#1}}
%(tear_sheet)s
}\end{center}
\end{table}


\newpage
 \section*{Cumulative Returns Plot}
\begin{figure}[h!]
    \includegraphics[width=\\textwidth]{cum_ret.pdf}
    \label{fig:my_label}
\end{figure}

\section*{Period Wise Returns Plot}
TODO


\newpage 
\section*{Underwater Plot}
\begin{figure}[h!]
    \includegraphics[width=\\textwidth]{underwater.pdf}
    \label{fig:my_label}
\end{figure}

\section*{Other things}

\end{document}
'''


def get_algo_summary(experiment):
    asset_list = experiment.get_asset_list()
    returns = [asset['assetId'] for asset in asset_list if asset['fileName'] == 'algo_summary'][0]
    a = pd.DataFrame(json.loads(experiment.get_asset(returns)))
    a.set_index('date', inplace=True)
    a.index = pd.DatetimeIndex(a.index, dayfirst=True)
    return a

def get_algo_summary_local(path):
    with open(path, 'rb') as f:
        a = pd.DataFrame(json.load(path))

# Gets the start and end dates for an experiment.
def get_algo_dates(experiment: APIExperiment):
    start_date = experiment.get_parameters_summary('start_date')['valueCurrent']
    end_date = experiment.get_parameters_summary('end_date')['valueCurrent']
    return datetime.fromisoformat(start_date), datetime.fromisoformat(end_date)


def get_experiment_summaries(id_dict):
    summaries = {}
    symbols, start_date, end_date = None, None, None
    for name, exp_id in id_dict.items():
        experiment = comet_api.get_experiment(project_name="tests", 
                                    workspace="alex-guerra-618",
                                    experiment=exp_id)
        summaries[name] = get_algo_summary(experiment)

        # This ensures that all symbols from all experiments match up.
        sym = ast.literal_eval(experiment.get_parameters_summary('tickers')['valueCurrent'])
        if symbols is None:
            symbols = sym
        else:
            assert set(sym) == set(symbols)

        # The following ensures that all the dates match up.
        sd, ed = get_algo_dates(experiment)
        if start_date is None or end_date is None:
            start_date, end_date = sd, ed
        else:
            assert sd == start_date and ed == end_date 

    
    return {
        "symbols": symbols, # List of symbols traded by the experiments.
        "start_date": start_date, # Start date of the backtest
        "end_date": end_date, # End date of the backtest
        "summary": summaries # data from each experiment
    }    
    

def map_funcs(func_dict, objs):
    res = {}
    for key, func in func_dict.items():
        res[key] = func(*objs)
    return res

def make_latex_table(algo_stats, col_names):
    col_str = "|" + "c|" * (len(col_names) + 1)
    a = f"\\begin{{tabular}}{{{col_str}}}\\hline \n"
    b = ""
    for cn in col_names:
        b += f" & \\textbf{{{cn}}} "
    b += " \\\\ \\hline \n"
    c = ""
    for key in algo_stats.keys():
        line_str = f"{key}"
        for entry in algo_stats[key]:
            line_str += f" & {entry:.02f}"
        c += line_str + " \\\\ \\hline\n "
    d = "\\end{tabular}\n"
    return a + b + c + d

# Creates the tear sheet.
def create_tear_sheet(summary_dict):
    all_summaries = {}
    for key, summary in summary_dict['summary'].items():
        # computes the algo stats where only our own returns are needed to calculate
        algo_stats = map_funcs(TEAR_SHEET_FUNCS, (summary['our_log_ret'],))
        # Computes the algo stats where we need to compare to some baseline
        alpha_beta = map_funcs(ALPHA_BETA_FUNCS, (summary['our_log_ret'], summary['BAC_log_ret']))
        # Merges the stats together.
        algo_stats = algo_stats | alpha_beta
        for stat_name in algo_stats:
            if stat_name not in all_summaries.keys():
                all_summaries[stat_name] = [algo_stats[stat_name]]
            else:
                all_summaries[stat_name].append(algo_stats[stat_name])

    # Now, make a LaTeX table of the stats.
    a = make_latex_table(all_summaries, summary_dict['summary'].keys())
    symbol_str = ', '.join(map(str, summary_dict['symbols'])) 
    sd = summary_dict['start_date']
    ed = summary_dict['end_date']
    caption = f"\caption{{Backtest Statistics for trading {symbol_str} from {sd.month}-{sd.day}-{sd.year} to {ed.month}-{ed.day}-{ed.year}}}"
    return a + caption

# Plotting the cumulative returns over the backtest
def plot_cumulative_returns(summary_dict):
    # Get all of our log returns
    ours = [onp.exp(cum_log_returns(summary['our_log_ret'])) for _, summary in summary_dict['summary'].items()]
    # TODO: Make this generic.
    _, first_summary = next(iter(summary_dict['summary'].items()))
    syms = [onp.exp(cum_log_returns(first_summary['BAC_log_ret']))]
    xl, yl, tit = "Date", "Normalized Return", "Cumulative Portfolio Returns vs. Underlying securities"
    comparative_line_plot(ours, syms, xl, yl, tit, "cum_ret") # Or can be none.

# Plotting underwater values over the backtest
def plot_underwater(summary_dict):
    # Get all of our returns
    ours = [underwater(summary['our_log_ret']) for _, summary in summary_dict['summary'].items()]
    xl, yl, tit = "Date", "Underwater %", "Underwater Plots for our Algorithms."
    line_plot(ours, xl, yl, tit, "underwater")


if __name__ == "__main__":
    exp_ids = {
        "Algo 1": "a01f0695088b4c18982acf3fc76db50d"
    }
    # summary = get_algo_summary(api_exp)
    summary = get_experiment_summaries(exp_ids)
    print(summary)