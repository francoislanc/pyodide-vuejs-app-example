import sys
import js
import pandas as pd
from sklearn.model_selection import train_test_split

languages = js.languages['rows']

## need to convert languages object for pandas dataframe
## obj loaded from vuejs data does not seems to be loadable directly into a dataframe
languages2 = []
for l in languages:
    languages2.append({'name': l['name'], 'language': l['language']})

languages_df = pd.DataFrame(languages2)
X = languages_df.to_dict('records')
y = languages_df['language'].values.tolist()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y)

(X_train, X_test)