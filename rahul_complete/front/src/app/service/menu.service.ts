import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: Menu[];
  constructor() { 
    this.menu = [
      {
        id: 'aniversary', name: 'Aniversary', logo: '', subMenu: [
          {
            id: 'category', name: 'Categories', category: [
              { id: 'candlelight', name: 'Candlelight Dinner', logo: '' },
              { id: 'anniversaryDecoration', name: 'Anniversary Decorations', logo: '' },
              { id: 'cake', name: 'Cake', logo: '' },
              { id: 'bouquets', name: 'Bouquets', logo: '' },
              { id: 'suprises', name: 'Suprises', logo: '' },
              { id: 'coupleActivaies', name: 'CoupleActivities', logo: '' }],
          }, {
            id: 'decorations', name: 'Decorations', category: [
              { id: 'balloonDecoration', name: 'BalloonDecoration', logo: '' },
              { id: 'loveWall', name: 'Love Wall', logo: '' },
              { id: 'specialAnniversaryDecoration', name: 'Special Anniversary Decoration', logo: '' },
              { id: 'hotelRoomDecoration', name: 'Hotel Room Decoration', logo: '' },
              { id: 'decorationDiyKits', name: 'Decoration DIY Kits', logo: '' }
            ]
          }, {
            id: 'gifts', name: 'Gifts', category: [
              { id: 'digitalGifts', name: 'Digital Gits', logo: '' },
              { id: 'personalizedSurprises', name: 'Personalized Surprises', logo: '' },
              { id: 'balloonBoxes', name: 'BalloonBoxes', logo: '' },
              { id: 'photoGifts', name: 'Photo Gifts', logo: '' },
              { id: 'heartShapeCakes', name: 'Heart Shape Cakes', logo: '' },
              { id: 'combos', name: 'Combos', logo: '' },
              { id: 'bouquests', name: 'Bouquests', logo: '' }
            ]
          }
        ]
      }, {
        id: 'birthdays', name: 'Birthdays', logo: '', subMenu: [
          {
            id: 'categories', name: 'Catgegories', category: [
              { id: 'birthdaySpeicalDecors', name: 'Birthday Special Decors', logo: '' },
              { id: 'candlelightDinners', name: 'Candlelight Dinners', logo: '' },
              { id: 'birthdayCakes', name: 'Birthday Cakes', logo: '' },
              { id: 'birthdaySurprise', name: 'Birthday Surprise', logo: '' },
              { id: 'coupleActivities', name: 'Couple Activities', logo: '' }
            ]
          }, {
            id: 'decorations', name: 'Decorations', category: [
              { id: 'birthdayBalloonDecoration', name: 'Birthday Balloon Decoration', logo: '' },
              { id: 'birthdayChampagne', name: 'Birthday Champagne', logo: '' },
              { id: 'birthdayDIYKits', name: 'Birthday DIY Kits', logo: '' },
              { id: 'hotelRoomDecoration', name: 'Hotel Room Decoration', logo: '' },
              { id: 'fairyLightsDecoration', name: 'Fairy Lights Decoration', logo: '' }
            ]
          }, {
            id: 'birthadayGifts', name: 'Birthday Gifts', category: [
              { id: 'photoGifts', name: 'Photo Gifts', logo: '' },
              { id: 'digitalGifts', name: 'Digital Gifts', logo: '' },
              { id: 'balloonBoxes', name: 'Balloon Boxes', logo: '' },
              { id: 'celebrity', name: 'Celebrity wishes', logo: '' },
              { id: 'personalizedSuprises', name: 'Personalized Surprises', logo: '' },
              { id: 'birthdayCakes', name: 'Birthday Cakes', logo: '' },
              { id: 'combos', name: 'Combos', logo: '' },
              { id: 'bouquets', name: 'Bouquets', logo: '' }
            ]
          }
        ]
      }, {
        id: 'giftsSurprises', name: 'Gifts Surprises', logo: '', subMenu: [
          {
            id: 'cakesAndBouquets', name: 'Cake & Bouquets', category: [
              { id: 'allCakes', name: 'All Cakes', logo: '' },
              { id: 'allBouquets', name: 'All Bouquets', logo: '' },
              { id: 'cakeBouquetsCombos', name: 'Cake Bouquets Combos', logo: '' },
              { id: 'heartShapeCake', name: 'Heart Shape Cakes', logo: '' },
              { id: 'designerCakes', name: 'DesignerCakes', logo: '' },
              { id: 'photoCakes', name: 'Photo Cakes', logo: '' }
            ]
          }, {
            id: 'categories', name: 'Categories', category: [
              { id: 'balloonBoxes', name: 'Ballon Boxes', logo: '' },
              { id: 'photoFrames', name: 'Photo Frames', logo: '' },
              { id: 'digitalGifts', name: 'Digital Gifts', logo: '' },
              { id: 'photoFrames', name: 'Photo Frames', logo: '' },
              { id: 'giftCombos', name: 'Gift Combos', logo: '' },
              { id: 'celebrityWishes', name: 'Celebrity Wishes', logo: '' },
              { id: 'tastyCakes', name: 'Tasty Cakes', logo: '' },
              { id: 'freshBouquets', name: 'Fresh Bouquets', logo: '' }
            ]
          }, {
            id: 'digitalGifts', name: 'Digital Gifts', category: [
              { id: 'gutaristVideoCall', name: 'Gutarist on Video Call', logo: '' },
              { id: 'eNewsPaperSurprise', name: 'E-News Paper Surprise', logo: '' },
              { id: 'digitalPhotoMosiac', name: 'Digital Photo Mosiac', logo: '' },
              { id: 'heartCollageFrame', name: 'Heart Collage Frame', logo: '' },
              { id: 'secretMessageSurprise', name: 'Secret Message Surprise', logo: '' }
            ]
          }
        ]
      }, {
        id: 'candlelightDinner', name: 'Candlelight Dinner', logo: '', subMenu: [
          {
            id: 'categories', name: 'Categories', category: [
              { id: 'privateCandlelightDinner', name: 'Private Candlelight Dinners', logo: '' },
              { id: 'poolsideCandlelightDinner', name: 'Poolside Candleligth Dinners', logo: '' },
              { id: 'outdoorDinner', name: 'Outdoor Dinners', logo: '' },
              { id: 'pocketFriendlyDining', name: 'Pocket Friendly Dining', logo: '' },
              { id: 'lunchSpeicals', name: 'Lunch Specials', logo: '' }
            ]
          }, {
            id: '5starProperties', name: '5 Star Properties', category: [
              { id: 'dinnerAtTridentHotels', name: 'Dinners at Trident Hotels', logo: '' },
              { id: 'diningInLeMeidien', name: 'Dining in Le Medien', logo: '' },
            ]
          }, {
            id: 'ourRecommendtions', name: 'Our Recommentions', category: [
              { id: 'aRoyalDinner', name: 'A Royal Dinner', logo: '' },
              { id: 'skydeckLoveChamber', name: 'Skydeck Love Chamber', logo: '' },
              { id: 'dinnerOnDunes', name: 'Dinner on the Dunes', logo: '' }
            ]
          }
        ]
      }, {
        id: 'occasions', name: 'Occasions', logo: '', subMenu: [
          {
            id: 'specialOccasions', name: 'Special Occasions', category: [
              { id: 'birthdayCelebrations', name: 'Birthday Celebrations', logo: '' },
              { id: 'anniversarySurprises', name: 'Anniversary Surprises', logo: '' },
              { id: 'proposalSpecialExperience', name: 'Proposal Special Experiences', logo: '' }
            ]
          }, {
            id: 'byRecepient', name: 'By Recepient', category: [
              { id: 'husband', name: 'Husband', logo: '' },
              { id: 'wife', name: 'Wife', logo: '' },
              { id: 'boyfriend', name: 'Boyfriend', logo: '' },
              { id: 'girlfriend', name: 'Girlfriend', logo: '' }
            ]
          }, {
            id: 'upcommingEvents', name: 'Upcomming Events', category: [
              { id: "fatherDay", name: "Father's Day", logo: '' },
              { id: "girlfriendDay", name: "Girlfriend's Day", logo: '' },
              { id: 'independence day', name: 'Independence day', logo: '' }
            ]
          }
        ]
      }, {
        id: 'decorations', name: 'Decorations', logo: '', subMenu: [
          {
            id: 'byType', name: 'By Type', category: [
              { id: 'balloonDecorations', name: 'Balloon Decorations', logo: '' },
              { id: 'wallDecorations', name: 'Wall Decorations', logo: '' },
              { id: 'diyDecorationKits', name: 'DIY Decoration Kits', logo: '' },
              { id: 'umbrellaDecoration', name: 'Umbrella Decorations', logo: '' }
            ]
          }, {
            id: 'byOccasion', name: 'By Occasion', category: [
              { id: 'babyShower', name: 'Baby Shower', logo: '' },
              { id: 'kidsBirthdayParty', name: 'Kids Birthday Party', logo: '' },
              { id: 'birthdayDecoration', name: 'Birthday Decoration', logo: '' },
              { id: 'anniversaryDecoration', name: 'Anniversary Decoration', logo: '' },
              { id: 'firstNightDecoration', name: 'First Night Decorations', logo: '' }
            ]
          }, {
            id: 'kidsThemeDecor', name: 'Kids Theme Decor', category: [
              { id: 'unicornDecorations', name: 'Unicorn Decorations', logo: '' }
            ]
          }
        ]
      }
    ];
  }
 
}
