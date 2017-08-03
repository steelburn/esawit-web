export class Get_IMEI
{
	constructor(
		public user_GUID: string = null,
		public user_IMEI: string = null,
		public active: number = null,
		public module_id: number = null,
		public created_ts: string = null,
		public updated_ts: Date = null,
		public fullname: string = null,
		public Imei_GUID:string=null,

		
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Get_IMEI(
			json.user_GUID,
			json.user_IMEI,
			json.active,json.module_id,
			json.created_ts,
			json.updated_ts,json.fullname,json.Imei_GUID
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			user_GUID:this.user_GUID,
			user_IMEI:this.user_IMEI,
			active:this.active,module_id:this.module_id,
			created_ts:this.created_ts,
			updated_ts:this.updated_ts,fullname:this.fullname,Imei_GUID:this.Imei_GUID
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}