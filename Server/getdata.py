from comet_ml.api import API
import json
import pandas as pd

import os
import cloudpickle


def getdata():
    experiment_dir = "experiments"
    api = API("wOduPvxJkmBFNXJIbvZmgDwBp")
    workspace = "alex-guerra-618"
    project_name = "tests"
    ## Return all of my workspace names in a list:
    experiments = api.get(workspace, project_name)
    for exp in experiments:
        path = os.path.join(experiment_dir, exp.id)
        if not os.path.isdir(path):

            asset_list = exp.get_asset_list()
            summary = [asset['assetId'] for asset in asset_list if asset['fileName'] == 'algo_summary']
            if len(summary) == 0:
                continue
            summary = summary[0]
            # Can also get other things here
            a = pd.DataFrame(json.loads(exp.get_asset(summary)))
            a.set_index('date', inplace=True)
            a.index = pd.DatetimeIndex(a.index, dayfirst=True)

            os.makedirs(os.path.join(experiment_dir, exp.id))

            # Now save the dataframe
            with open(os.path.join(path, "algo_summary.data"), "wb") as f:
                cloudpickle.dump(a, f)

            # Add Other stuff to load here -> for right now we just get algo summaries.


getdata()