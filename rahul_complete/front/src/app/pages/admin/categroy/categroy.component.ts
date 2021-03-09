import { Component, OnInit } from '@angular/core';
import { Category, Parent, SubMenu } from '../../../model/category';
import { CategoryService } from '../../../service/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categroy',
  templateUrl: './categroy.component.html',
  styleUrls: ['./categroy.component.css']
})
export class CategroyComponent implements OnInit {
  parent: Parent = {
    parent_id: '',
    parent_name: ''
  };
  subMenu: SubMenu = {
    subMenu_id: '',
    subMenu_name: ''
  };
  category: Category = {
    parent_id: '',
    subMenu_id: '',
    category_id: '',
    category_name: ''
  }

  currentParent: Parent = {};
  currentSubMenu: SubMenu = {};
  currentCategory: Category = {};
  message:string = '';
  
  submitted: boolean = false;

  parents: Parent[] = [];
  subMenus: SubMenu[] = [];
  categories: Category[] = [];

  current_parentId: string = "";
  current_subMenuId: string = "";

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {

    this.retrieveParents();
    this.retrieveSubMenus();
    this.retrieveCategories();

  }

  retrieveParents(): void {

    this.categoryService.getParentsAll()
      .subscribe(
        (response: any) => {
          console.log(response);
          // const { experiences, totalItems } = response;
          this.parents = response;
          console.log(this.parents);
        },
        (error: any) => {
          console.log(error);
        });
  };

  retrieveSubMenus(): void {
    this.categoryService.getSubMenusAll()
      .subscribe(
        (response: any) => {
          this.subMenus = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  };

  retrieveCategories(): void {
    this.categoryService.getCategoriesAll()
      .subscribe(
        (response: any) => {
          this.categories = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  };

  saveParent(): void {
    const data = {
      parent_id: this.parent.parent_id,
      parent_name: this.parent.parent_name,

    };

    console.log(data);
    this.categoryService.createParent(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        alert("Parent was submitted successfully!");
        // this.newParent();
        this.retrieveParents();
        this.parent.parent_id = '';
        this.parent.parent_name = '';
      },
      error => {
        console.log(error);
      }
    );
  };

  saveSubMenu(): void {
    const data = {
      parent_id: this.subMenu.parent_id,
      subMenu_id: this.subMenu.subMenu_id,
      subMenu_name: this.subMenu.subMenu_name,

    };

    console.log(data);
    this.categoryService.createSubMenu(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        alert("SubMenu was submitted successfully!");
        // this.newParent();
        this.retrieveSubMenus();
        this.subMenu.subMenu_id = '';
        this.subMenu.subMenu_name = '';
      },
      error => {
        console.log(error);
      }
    );
  };

  saveCategory(): void {
    const data = {
      parent_id: this.category.parent_id,
      subMenu_id: this.category.subMenu_id,
      category_id: this.category.category_id,
      category_name: this.category.category_name

    };

    console.log(data);
    this.categoryService.createCategory(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        alert("Category was submitted successfully!");
        // this.newParent();
        this.retrieveCategories();
        // this.category.parent_id ='';
        // this.category.subMenu_id ='';
        this.category.category_id = '';
        this.category.category_name = '';
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteParent(id:any) {
    this.categoryService.deleteParent(id).subscribe(
      (response:any) => {
        console.log(response);
        alert("Successfully was deleted!");
        this.retrieveParents();
        // this.router.navigateByUrl('/mod/experiences');
      },
      (errors:any) => {
        console.log(errors);
      }
    );
  }

  deleteSubMenu(id:any) {
    this.categoryService.deleteSubMenu(id).subscribe(
      (response: any) => {
        // console.log(response);
        alert("Successfully was deleted!");
        this.retrieveSubMenus();
      },
      (errors:any) => {
        console.log(errors);
      }
    )
  }

  deleteCategory(id:any) {
    this.categoryService.deleteCategory(id).subscribe(
      (response: any) => {
        // console.log(response);
        alert("Successfully was deleted!");
        this.retrieveCategories();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  selectParent(parent_name: any) {
    this.categoryService.getSubMenusByParent(parent_name).subscribe((data: any) => {
      this.subMenus = data;
    })
  }

  selectSubMenu(parent_name: any, subMenu_name:any) {
    this.categoryService.getCategoriesById(parent_name, subMenu_name).subscribe((data:any) => {
      this.categories = data;
    });
    // this.current_parentId = parent_name;
    // this.current_subMenuId = subMenu_name;
    // console.log(this.current_parentId);
  }

  editParent(id:any, parent: Parent) {
    this.currentParent = parent;
  }
  editSubMenu(id:any, subMenu: SubMenu) {
    this.currentSubMenu = subMenu;
  }
  editCategory(id:any, category: Category) {
    this.currentCategory = category;
  }
  updateParent() {
    this.categoryService.updateParent(this.currentParent.parent_id, this.currentParent).subscribe(
      response => {
        console.log(response);
        this.message = response.message;
        alert(this.message);
      },
      error => {
        console.log(error);
      }
    )
  }
  updateSubMenu() {
    this.categoryService.updateSubMenu(this.currentSubMenu.subMenu_id, this.currentSubMenu).subscribe(
      response => {
        this.message = response.message;
        alert(this.message);
      },
      error => {
        console.log(error);
        
      }
    )
  }
  updateCategory() {
    this.categoryService.updateCategory(this.currentCategory.category_id, this.currentCategory).subscribe(
      response => {
        this.message = response.message;
        alert(this.message);
      },
      error => {
        console.log(error);
      }
    )
  }
}
