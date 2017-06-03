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
  this.catArray = ko.observableArray([
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
  this.searchCatData = function(previousCatName){
    return ko.utils.arrayFirst(self.catArray(), function(catt){
      return (previousCatName === catt.catName);
    });
  };
  this.currentCat = ko.observable(new cat(this.catArray()[0]));
  this.updateCurrentCat = function(clickedCat){
    //Update current cat's click count in the model
    var previousCatName = self.currentCat().catName();
    var catInArray = self.searchCatData(previousCatName);
    catInArray.clickCount = self.currentCat().clickCount();
    //Update the current cat
    self.currentCat(new cat(clickedCat));
  }
}

ko.applyBindings(new viewModel());
