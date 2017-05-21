var model={
  catArray:[
    {
    catName:"Fiby",
    imagePath:"C:/Users/Parth/Study/CatClick/images/cat-1.jpg",
    clickCount:0
    },
    {
    catName:"Lency",
    imagePath:"C:/Users/Parth/Study/CatClick/images/cat-2.jpg",
    clickCount:0
    },
    {
    catName:"Mini",
    imagePath:"C:/Users/Parth/Study/CatClick/images/cat-3.jpg",
    clickCount:0
    },
    {
    catName:"Rachel",
    imagePath:"C:/Users/Parth/Study/CatClick/images/cat-4.jpg",
    clickCount:0
    },
    {
    catName:"Foxy",
    imagePath:"C:/Users/Parth/Study/CatClick/images/cat-5.jpg",
    clickCount:0
    }
  ],
  currentCat:null
};

var view={
  //var catDiv, catName, catClickCount, catPicture, listCatName;
  init:function(){
    this.catDiv = document.getElementById('cat-div');

    this.catClickCount = document.getElementById('cat-click-count');
    this.catPicture = document.getElementById('cat-picture');
    this.catName = document.getElementById('cat-name');

    this.catPicture.addEventListener('click', function(){
      controller.incrementCounter();
    });
    this.render();

  },
  render:function(){
    var currentCat = controller.getCurrentCat();
    this.catName.innerHTML = currentCat.catName;
    this.catPicture.src = currentCat.imagePath;
    this.catClickCount.innerHTML = currentCat.clickCount;
  },
  getCatPictureElem: function(){
    return this.catPicture;
  },
};

var listView={
  init:function(){
    this.listCatName = document.getElementById('list-cat-name');
    this.render();
  },
  render:function(){
    var allCats = controller.getAllCats();
    for(let i = 0; i < allCats.length; i++){
        var newCat = document.createElement('li');
        newCat.innerHTML = allCats[i].catName;
        newCat.addEventListener('click', (function(catCopy){
          return function(){
            controller.setCurrentCat(catCopy);
            view.render();//loophole - view to view communication
            if(controller.isAdminVisible())
              adminView.render();
          };
        })(allCats[i]));
        this.listCatName.appendChild(newCat);
    }
  }
};


var controller={
  init:function(){
    model.currentCat = model.catArray[0];
    view.init();
    listView.init();
  },
  getCurrentCat:function(){
    return model.currentCat;
  },
  setCurrentCat: function(cat){
    model.currentCat = cat;
  },
  getCurrentClickCount: function(){
    return model.currentCat.clickCount;
  },
  incrementCounter:function(){
    model.currentCat.clickCount++;
    view.render();
  },
  getAllCats:function(){
    return model.catArray;
  },
  isAdminVisible:function(){
    return adminView.formDivVisible;
  },
  updateCurrentCat:function(catCopy){
    model.currentCat = catCopy;
    view.render();
  },
};

controller.init();
