
export class Harvestreport {
	constructor(
		public bunch_count: string = null,
		public name: string = null,
		public created_ts: string = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Harvestreport(
			json.bunch_count,
			json.name,
			json.created_ts
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			id: this.bunch_count,
			name: this.name,
			created_ts:this.created_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}
