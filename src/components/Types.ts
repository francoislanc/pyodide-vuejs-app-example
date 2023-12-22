export interface Csv {
  selected?: Array<boolean>
  columns: Array<string>
  rows: Array<{ [key: string]: string }>
  csv?: string
}

export interface State {
  pyodide: {
    loadPackage(packages: Array<String>): void
    runPythonAsync(script: String): void
    runPython(script: String): void
    globals: any
  } | null
  splittingDataset: boolean
  errorMsg: string | null
  pyodideLoaded: boolean
  csv: Csv
  csvTrain: Csv
  csvTest: Csv
}
