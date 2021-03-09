export class Product {
    id: number;
    category: string;
    title: string;
    shortDes: string;
    detailDes: string;
    location: string;
    price: number;
    reviews: string;
    rating: number;
    img: string;

    constructor(id:number, category:string, title: string, shortDes: string, detailDes: string, location: string, price: number, reviews: string, rating: number, img: string) {
        this.id=id;
        this.category=category;
        this.title=title;
        this.shortDes = shortDes;
        this.detailDes = detailDes;
        this.location = location;
        this.price = price;
        this.reviews = reviews;
        this.rating = rating;
        this.img = img;
    }
}
