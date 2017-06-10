//Using the MV* framework Knockout.js

function cat(copyCat){
  this.catName = ko.observable(copyCat.catName);
  this.imagePath = ko.observable(copyCat.imagePath);
  this.clickCount = ko.observable(copyCat.clickCount);
  this.incrementCounter = function(){
    this.clickCount(this.clickCount()+1);
  };
  this.resetClickCounter = function(){
    this.clickCount(0);
  }
}

function viewModel(){
  var self = this;

  // Collection of cats
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

  // To find the cat object from catArray using catName
  this.searchCatData = function(previousCatName){
    return ko.utils.arrayFirst(self.catArray(), function(catt){
      return (previousCatName === catt.catName);
    });
  };

  // currentCat - main observable object of the app, initialized with cat at
  // 0th index in the catArray
  this.currentCat = ko.observable(new cat(this.catArray()[0]));
  self.currentCatIndex = 0;

  // To save the updated cat data in the catArray
  this.saveCurrentCat = function(){
    var catInArray = self.catArray()[self.currentCatIndex];
    catInArray.clickCount = self.currentCat().clickCount();
    catInArray.catName = self.currentCat().catName();
    catInArray.imagePath = self.currentCat().imagePath();
  }

  this.saveCurrentCatCount = function(){
    var catInArray = self.searchCatData(self.currentCat().catName());
    catInArray.clickCount = self.currentCat().clickCount();
  }

  this.shuffleCurrentCat = function(index, clickedCat){
    self.currentCatIndex = index;
    // Update current cat's click count in the model
    self.saveCurrentCatCount();
    // Update the current cat
    self.currentCat(new cat(clickedCat));
  }

  // Initially the form is invisible
  this.isAdminVisible = ko.observable(false);

  // Visibility of the form changes as the admin button is clicked
  this.toggleAdminView = function(){
    this.isAdminVisible(!this.isAdminVisible());
  }
}
//ko.applyBindings(new adminViewModel());
ko.applyBindings(new viewModel());
