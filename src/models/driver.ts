export class Driver {
	constructor(
		public tenant_GUID: string = null,
		public driver_GUID: string = null,
		public fullname: string = null,
		public identification_no: string = null,
		public identification_type: number = null,
		public address1: string = null,
		public address2: string = null,
		public address3: string = null,
		public phone_no: string = null,
		public email: string = null,
		public license_no: string = null,
		public start_year: string = null,
		public description: string = null,
		public employment_type: number = null,
		public active: number = null
	) { }


	static fromJson(json: any) {
		if (!json) return;

		return new Driver(
			json.tenant_GUID,
		    json.driver_GUID,
			json.fullname,
			json.identification_no,
			json.identification_type,
			json.address1,
			json.address2,
			json.address3,
			json.phone_no,
			json.email,
			json.license_no,
			json.start_year,
			json.description,
			json.employment_type,
			json.active
		);
	}


	toJson(stringify?: boolean): any {
		var doc = {
			tenant_GUID:this.tenant_GUID,
			driver_GUID:this.driver_GUID,
            fullname:this.fullname,
			identification_no:this.identification_no,
			identification_type:this.identification_type,
			address1:this.address1,
			address2:this.address2,
			address3:this.address3,
			phone_no:this.phone_no,
			email:this.email,
			license_no:this.license_no,
			start_year:this.start_year,
			description:this.description,
			employment_type:this.employment_type,
			active:this.active
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}