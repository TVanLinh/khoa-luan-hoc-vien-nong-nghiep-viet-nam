import { TaskService } from "./task.service";
import { Config } from "./config";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
@Injectable()
export  class  AddressService  {

	private cityShare  = null;
	private guidShare = null;
	private districtShare =null;
	
	//api = "https://cors-anywhere.herokuapp.com/https://thongtindoanhnghiep.co/api";
	api = "/";
	listCity = null;
	constructor(public taskService: TaskService) {
		/*if(this.listCity == null){
			this.taskService.get(Config.CATALOG_ADDRESS_URL +"/city").subscribe(data=>{
				this.listCity = data;
				console.log("city: "+JSON.stringify (this.listCity));
			});
		}*/
	}
	
	getAllCity() {
		return this.taskService.get(this.api + "/city");
	}
	getDistrictByCityID(id: number) {
		return this.taskService.get(this.api + "/city/"+id+"/district");
	}
	
	

	getGuildByDistrictId(id: number) {
		return this.taskService.get(this.api + "/district/"+id+"/ward");
	}
	
	 getALl() {
		for(let i = 1;i<64;i++) {
			this.getDistrictByCityID(i).subscribe( (data) =>{
			
					console.log("data  "+i+ "    "+JSON.stringify(data));
			});
		}
	}

	geCities() {
		if(this.cityShare == null){
			return this.cityShare = this.taskService.get(Config.CATALOG_ADDRESS_URL +"/city");
		}
		return this.cityShare;
	}
	
	geDistrict() {
		if(this.districtShare == null){
			return this.districtShare = this.taskService.get(Config.CATALOG_ADDRESS_URL +"/district");
		}
		return this.districtShare;
	}
	
	getGuild() {
		if(this.guidShare == null){
			return this.guidShare = this.taskService.get(Config.CATALOG_ADDRESS_URL +"/guild");
		}
		return this.guidShare;
	}
	
	getDistrictByTitleCity(array:any[],title) {
		if(array == null) {
			return "";
		}
	}
}