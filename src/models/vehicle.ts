export class VehicleModel 
{
	constructor(
		public ID: number = null,
        public tenant_GUID: string = null,
		public vehicle_GUID: string = null,
		public registration_no: string = null,
		public make: string = null,
		public model: string = null,
        public manufacturing_year:string=null,
        public capacity_tonne:number=null,
        public description:string=null,
        public active:number=null,
		public createdby_GUID: string = null,
		public created_ts: Date = null,
		public updatedby_GUID:string=null,
		public updated_ts :Date=null


	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new VehicleModel(
			json.ID,json.tenant_GUID,json.vehicle_GUID,json.registration_no,
			json.make,json.model,json.manufacturing_year,json.capacity_tonne,
			json.description,json.active,
            json.createdby_GUID,json.created_ts,json.updatedby_GUID,json.updated_ts
			
		);
	}


	toJson(stringify?: boolean): any
    {
		var doc = {
			ID:this.ID,tenant_GUID:this.tenant_GUID,
            vehicle_GUID:this.vehicle_GUID,
            registration_no:this.registration_no,
            make:this.make,model:this.model,manufacturing_year:this.manufacturing_year,
			capacity_tonne:this.capacity_tonne,description:this.description,
            active:this.active,createdby_GUID:this.createdby_GUID,created_ts:this.created_ts,
			updatedby_GUID:this.updatedby_GUID,updated_ts:this.updated_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}


///////
export class GET_VEHICLE_LOCATION {
	constructor(
		public ID:number=null,
		public vehicle_GUID: string = null,
		public name: string = null,
		public location_GUID: string = null,
		public is_checked: boolean = null,
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new GET_VEHICLE_LOCATION(
			json.ID,
			json.vehicle_GUID,
		    json.name,
			json.location_GUID,
			json.is_checked
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			ID:this.ID,
			vehicle_GUID:this.vehicle_GUID,
			registration_no:this.name,
			location_GUID:this.location_GUID,is_checked:this.is_checked
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}



///////
export class VEHICLEDRIVER_MODEL {
	constructor(
		public ID: number = null,
        public vehicle_GUID: string = null,
		public driver_GUID: string = null,
		public active: string = null,
		public createdby_GUID: string = null,
		public created_ts: Date = null,
		public updatedby_GUID:string=null,
		public updated_ts :Date=null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new VEHICLEDRIVER_MODEL(
			json.ID,
		    json.vehicle_GUID,
			json.driver_GUID,json.active,json.createdby_GUID,
			json.created_ts,json.updatedby_GUID,json.updated_ts
			
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			ID:this.ID,
			vehicle_GUID:this.vehicle_GUID,
			driver_GUID:this.driver_GUID,active:this.active,
			createdby_GUID:this.createdby_GUID,created_ts:this.created_ts,
			updatedby_GUID:this.updatedby_GUID,updated_ts:this.updated_ts

		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}