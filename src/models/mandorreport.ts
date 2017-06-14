
export class Mandorreport {
	constructor(
		public mandor: string = null,
        public lorry: string = null,
		public bunch_count: string = null,
		public created_ts: string = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Mandorreport(
            json.mandor,
			json.lorry,
			json.bunch_count,
			json.created_ts
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			mandor: this.mandor,
			lorry: this.lorry,
            bunch_count:this.bunch_count,
			created_ts:this.created_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}
