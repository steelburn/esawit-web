
export class ReconciliationReport 
{
	constructor(
		public ID: number = null,
		public Description: string = null,
		public resolved: number = null,
		public vehicle_id: string = null,
		public Vehicle: string = null,
        public location_id: string = null,
		public Location: string = null,
        public load_count: number = null,
        public bunch_ts: string = null,
		public unload_count: number = null,
        public unbunch_ts: string = null,
		
	) { }


	static fromJson(json: any) 
    {
		if (!json) return;

		return new ReconciliationReport(
			json.ID,json.Description,json.resolved,
			json.vehicle_id,json.Vehicle,json.location_id,json.Location,
            json.load_count,json.bunch_ts,json.unload_count,json.unbunch_ts
		);
	}


	toJson(stringify?: boolean): any {
		var doc = 
        {
			 ID:this.ID,Description:this.Description,resolved:this.resolved,
    		 vehicle_id: this.vehicle_id,
    		 Vehicle: this.Vehicle,
             location_id: this.location_id,
    		 Location: this.Location,
             load_count: this.load_count,
             bunch_ts: this.bunch_ts,
    		 unload_count: this.unload_count,
             unbunch_ts: this.unbunch_ts
		};

		return stringify ? JSON.stringify({ resource: [doc] }) : doc;
	}

}


