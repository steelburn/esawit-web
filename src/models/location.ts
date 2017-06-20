export class LocationModel 
{
	constructor(
		public ID: number = null,
        public tenant_GUID: string = null,
		public location_GUID: string = null,
		public name: string = null,
		public location_type: number = 2,
		public active: number = null,
		public createdby_GUID: string = null,
		public created_ts: Date = null,
		public updatedby_GUID:string=null,
		public updated_ts :Date=null


	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new LocationModel(
			json.ID,
			json.tenant_GUID,
		    json.location_GUID,
			json.name,
			json.location_type,
			json.active,json.createdby_GUID,json.created_ts,json.updatedby_GUID,json.updated_ts
			
		);
	}


	toJson(stringify?: boolean): any
    {
		var doc = {
			ID:this.ID,
			tenant_GUID:this.tenant_GUID,
            location_GUID:this.location_GUID,
            name:this.name,
			location_type:this.location_type,
            active:this.active,createdby_GUID:this.createdby_GUID,created_ts:this.created_ts,
			updatedby_GUID:this.updatedby_GUID,updated_ts:this.updated_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}