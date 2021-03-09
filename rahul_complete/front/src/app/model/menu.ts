interface category {
    id: string;
    name: string;
    logo: string;
}
interface subMenu {
    id: string;
    name: string;
    category: category[];
}
export class Menu {
    id: string ="";
    name: string = "";
    logo: string = "";
    subMenu: subMenu[] =[];

    constructor(id:string, name: string, logo:string, subMenu:  subMenu[]) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.subMenu = subMenu;
    }
}
