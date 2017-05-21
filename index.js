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
            view.render();
            if(controller.isAdminVisible())
              adminView.render();
          };
        })(allCats[i]));
        this.listCatName.appendChild(newCat);
    }
  }
};

var adminView={
  init:function(){
    this.formDivVisible = false;
    this.formDiv = document.getElementById('form-div');
    this.formDiv.style.display = 'none';
    this.formCatName = document.getElementById('form-cat-name');
    this.formCatImg = document.getElementById('form-cat-img');
    this.formCatclicks = document.getElementById('form-cat-clicks');
    this.formSubmitButton = document.getElementById('submit');

    this.formSubmitButton.addEventListener('click', function(){
        //Because the event handler method is in different scope than the adminView
        var av = controller.getAdminView();
        var updatedCat = {
          catName:av.formCatName.value,
          imagePath:av.formCatImg.value,
          clickCount:av.formCatclicks.value
        };
        controller.updateCurrentCat(updatedCat);
        av.cleanFormData();
        controller.hideAdminDiv();
        controller.toggleAdminVisiblilityVal();
    });
    this.render();
  },
  render:function(){
    var currentCat = controller.getCurrentCat();
    this.formCatName.value = currentCat.catName;
    this.formCatImg.value = currentCat.imagePath;
    this.formCatclicks.value = currentCat.clickCount;
  },
  cleanFormData:function(){
    this.formCatName.value = "";
    this.formCatImg.value = "";
    this.formCatclicks.value = "";
  }
};

var adminButtonView={
  init:function(){
    this.adminButton = document.getElementById('admin-button');
    this.adminButton.addEventListener('click', function(){
      if(controller.isAdminVisible()){
        controller.hideAdminDiv();
      } else{
        controller.showAdminDiv();
        adminView.render(); 
      }
      controller.toggleAdminVisiblilityVal();
    });
  }
};

var controller={
  init:function(){
    model.currentCat = model.catArray[0];
    view.init();
    listView.init();
    adminView.init();
    adminButtonView.init();
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
    if(this.isAdminVisible()){
      adminView.formCatclicks.value = this.getCurrentCat().clickCount;
    }
  },
  getAllCats:function(){
    return model.catArray;
  },
  isAdminVisible:function(){
    return adminView.formDivVisible;
  },
  toggleAdminVisiblilityVal:function(){
    if(adminView.formDivVisible){
      adminView.formDivVisible = false;
      adminButtonView.adminButton.innerText = "Admin";
    }else{
      adminView.formDivVisible = true;
      adminButtonView.adminButton.innerText = "Cancel";
    }
  },
  getAdminDiv:function(){
    return adminView.formDiv;
  },
  showAdminDiv:function(){
    adminView.formDiv.style.display = 'block';
  },
  hideAdminDiv:function(){
    adminView.formDiv.style.display = 'none';
  },
  updateCurrentCat:function(catCopy){
    model.currentCat = catCopy;
    view.render();
  },
  getAdminView:function(){
    return adminView;
  }
};

controller.init();
