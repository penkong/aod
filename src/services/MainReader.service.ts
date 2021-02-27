import { CsvReaderReader } from './CsvReader.service'

interface DataReader {
	read(): void
	data: string[][]
}

interface Data {}

// this accept any reader from any hospital csv
export class MainReader {
	static fromCsv(filename: string): MainReader {
		return new MainReader(new CsvReaderReader(filename))
	}

	matches: Data[] = []

	constructor(public reader: DataReader) {}

	load(): void {
		this.reader.read()
		this.matches = this.reader.data.map(
			(_: string[]): Data => [
				'will return in format we want or call cb() to put on database'
			]
		)
	}
}
