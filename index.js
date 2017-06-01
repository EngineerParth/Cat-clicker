//Using the MV* framework Knockout.js

function cat(copyCat){
  this.catName = ko.observable(copyCat.catName);
  this.imagePath = ko.observable(copyCat.imagePath);
  this.clickCount = ko.observable(copyCat.clickCount);
  this.incrementCounter = function(){
    this.clickCount(this.clickCount()+1);
  }
}

function viewModel(){
  var self = this;
  this.catArray=ko.observableArray([
    {
    catName:"Fiby",
    imagePath:"C:/Users/Parth/Study/CatClicker/images/cat-1.jpg",
    clickCount:0
    },
    {
    catName:"Lency",
    imagePath:"C:/Users/Parth/Study/CatClicker/images/cat-2.jpg",
    clickCount:0
    },
    {
    catName:"Mini",
    imagePath:"C:/Users/Parth/Study/CatClicker/images/cat-3.jpg",
    clickCount:0
    },
    {
    catName:"Rachel",
    imagePath:"C:/Users/Parth/Study/CatClicker/images/cat-4.jpg",
    clickCount:0
    },
    {
    catName:"Foxy",
    imagePath:"C:/Users/Parth/Study/CatClicker/images/cat-5.jpg",
    clickCount:0
    }
  ]);
  this.currentCat = ko.observable(new cat(this.catArray()[0]));
  this.updateCurrentCat = function(clickedCat){
    console.log("previous cat: "+ self.currentCat().catName());
    //self.catArray()[self.catArray(currentCatName)].clickCount = self.currentCat().clickCount();
    self.currentCat(new cat(clickedCat));
  }
}

ko.applyBindings(new viewModel());
