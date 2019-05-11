import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, SegmentButton, 
LoadingController, Loading, ModalController, Slides, ToastController } from 'ionic-angular';
//provider
import { YoutubeProvider } from '../../providers/youtube';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Items } from '../../interfaces/youtube.interfaces';
import { Network } from '@ionic-native/network';
import { GalleryProvider } from '../../providers/gallery';
//image viewer import
import { ImageViewerController } from 'ionic-img-viewer'




@IonicPage()
@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  section: string;
  information: any[];
  loader: Loading;
  categories: Items[] = [];
  videos: Items[] = [];
  galleryList: any;
  noCon: boolean = false;
  @ViewChild('categorySlides') categorySlides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public galleryProvider: GalleryProvider,
    private youtubeProvider: YoutubeProvider, public youtube: YoutubeVideoPlayer, private network:Network, public imageViewerCtrl: ImageViewerController,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController, public toast: ToastController) {
    
      // Fetch image for gallery list
      this.galleryProvider.getGallery().on('value', snapshot => {
        this.galleryList = [];
        snapshot.forEach( snap => {
          this.galleryList.push({
            id: snap.key,
            title: snap.val().title,
            downloadURL: snap.val().downloadURL
          });
  
        });
      
       });
    // Get service list from json file in assets/service.json
    this.section = "services";
    let localData = http.get('assets/services.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    })

    // Fetch asynchronously all categories first
    this.youtubeProvider.fetchCategories()
    .then(data => {
      if (data) {
        this.categories = data.items;
      }
    });

    // Fetch tranding videos
    this.searchTrandingVideos();

     //get the list of blogs from the BlogProvider
     
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioPage');
       }
      // Get Network information
       displayNetworkUpdate(connectionState: string) {
        this.toast.create({
          message: `You are now ${connectionState}`,
          showCloseButton: true,
          closeButtonText: 'Ok'
        }).present();
      }

       ionViewDidEnter() {
        this.network.onConnect().subscribe(data => {
          console.log(data)
          this.displayNetworkUpdate(data.type);
        }, error => console.error(error));
    
        this.network.onDisconnect().subscribe(data => {
          console.log(data)
          this.displayNetworkUpdate(data.type);
        }, error => console.error(error));
      }
    
  
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }


  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

  searchVideos(categoryId: number) {
    //this.presentLoading();
    this.youtubeProvider.searchVideos(categoryId)
    .then(data => {
      if (data) {
        this.videos = data.items;
        //this.loader.dismiss();
      }
    });
  }

  searchTrandingVideos() {
    //this.presentLoading();
    this.youtubeProvider.searchTrandingVideos()
    .then(data => {
      if (data) {
        this.videos = data.items;
        //this.loader.dismiss();
      }
    });
  }
  // Image viewer function
  presentImage(image){
    let imageViewer = this.imageViewerCtrl.create(image);
    imageViewer.present();
}

}


  







