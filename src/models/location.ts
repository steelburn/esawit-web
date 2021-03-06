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



export class GETLOCATION {
	constructor(
		public vehicle_GUID: string = null,
		public registration_no: string = null,
		public location_GUID: string = null,
		public is_checked: boolean = null,
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new GETLOCATION(
			json.vehicle_GUID,
		    json.registration_no,
			json.location_GUID,
			json.is_checked
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			vehicle_GUID:this.vehicle_GUID,
			registration_no:this.registration_no,
			location_GUID:this.location_GUID,is_checked:this.is_checked
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}



///////
export class LOCATION_VEHICLE_MODEL {
	constructor(
		public ID: number = null,
        public vehicle_GUID: string = null,
		public location_GUID: string = null,
		public active: string = null,
		public createdby_GUID: string = null,
		public created_ts: Date = null,
		public updatedby_GUID:string=null,
		public updated_ts :Date=null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new LOCATION_VEHICLE_MODEL(
			json.ID,
		    json.vehicle_GUID,
			json.location_GUID,json.active,json.createdby_GUID,
			json.created_ts,json.updatedby_GUID,json.updated_ts
			
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			ID:this.ID,
			vehicle_GUID:this.vehicle_GUID,
			location_GUID:this.location_GUID,active:this.active,
			createdby_GUID:this.createdby_GUID,created_ts:this.created_ts,
			updatedby_GUID:this.updatedby_GUID,updated_ts:this.updated_ts

		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}

export class GETLOCATION_CHART
{
	constructor(
		public Active: string = null,
		public TOTAL: number = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new GETLOCATION_CHART(
			json.Active,
		    json.TOTAL
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			Active:this.Active,
			TOTAL:this.TOTAL
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}