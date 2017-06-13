
export class Factoryreport {
	constructor(
		public bunch_count: string = null,
		public location: string = null,
        public lorry: string = null,
		public created_ts: string = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Factoryreport(
			json.bunch_count,
			json.location,json.lorry,
			json.created_ts
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			bunch_count: this.bunch_count,
			location: this.location,
            lorry: this.lorry,
			created_ts:this.created_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}
