define(["libraryBrowser","scrollStyles"],function(e){return function(t,r){function a(){return"Thumb"}function n(){return"Poster"}function s(){Dashboard.showLoadingMsg(),d(),i()}function i(){var r={Limit:24,Fields:"PrimaryImageAspectRatio,SeriesInfo,DateCreated,SyncInfo",UserId:Dashboard.getCurrentUserId(),ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};r.ParentId=LibraryMenu.getTopParentId(),ApiClient.getNextUpEpisodes(r).then(function(r){r.Items.length?t.querySelector(".noNextUpItems").classList.add("hide"):t.querySelector(".noNextUpItems").classList.remove("hide");var n=a(),s="";"ThumbCard"==n?s+=e.getPosterViewHtml({items:r.Items,shape:"backdrop",showTitle:!0,preferThumb:!0,showParentTitle:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0}):"Thumb"==n&&(s+=e.getPosterViewHtml({items:r.Items,shape:"backdrop",showTitle:!0,showParentTitle:!0,overlayText:!1,lazy:!0,preferThumb:!0,showDetailsMenu:!0,centerText:!0,overlayPlayButton:AppInfo.enableAppLayouts}));var i=t.querySelector("#nextUpItems");i.innerHTML=s,ImageLoader.lazyChildren(i),Dashboard.hideLoadingMsg()})}function o(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function l(){return o()?"overflowBackdrop":"backdrop"}function d(){var r=LibraryMenu.getTopParentId(),a=6,s={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Episode",Filters:"IsResumable",Limit:a,Recursive:!0,Fields:"PrimaryImageAspectRatio,SeriesInfo,UserData,SyncInfo",ExcludeLocationTypes:"Virtual",ParentId:r,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getItems(Dashboard.getCurrentUserId(),s).then(function(r){r.Items.length?t.querySelector("#resumableSection").classList.remove("hide"):t.querySelector("#resumableSection").classList.add("hide");var a=n(),s="";"PosterCard"==a?s+=e.getPosterViewHtml({items:r.Items,shape:l(),showTitle:!0,showParentTitle:!0,lazy:!0,cardLayout:!0,showDetailsMenu:!0,preferThumb:!0}):"Poster"==a&&(s+=e.getPosterViewHtml({items:r.Items,shape:l(),showTitle:!0,showParentTitle:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0,preferThumb:!0,centerText:!0}));var i=t.querySelector("#resumableItems");i.innerHTML=s,ImageLoader.lazyChildren(i)})}function c(e,a,n){var s=[];switch(a){case 0:break;case 1:s.push("scripts/tvlatest");break;case 2:s.push("scripts/tvupcoming");break;case 3:s.push("scripts/tvshows");break;case 4:s.push("scripts/episodes");break;case 5:s.push("scripts/tvgenres");break;case 6:s.push("scripts/tvstudios")}require(s,function(e){var s;0==a&&(s=t.querySelector(".pageTabContent[data-index='"+a+"']"),h.tabContent=s);var i=y[a];i||(s=t.querySelector(".pageTabContent[data-index='"+a+"']"),i=a?new e(t,r,s):h,y[a]=i,i.initTab&&i.initTab()),n(i)})}function u(e,t){c(e,t,function(e){-1==I.indexOf(t)&&e.preRender&&e.preRender()})}function b(e,t){c(e,t,function(e){-1==I.indexOf(t)&&(I.push(t),e.renderTab())})}function m(t,r){r.NowPlayingItem&&"Video"==r.NowPlayingItem.MediaType&&(I=[],f.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:e.selectedTab(f)}})))}function p(e,t){var r=t;"UserDataChanged"===r.MessageType&&r.Data.UserId==Dashboard.getCurrentUserId()&&(I=[])}var h=this;h.initTab=function(){var t=h.tabContent;o()?t.querySelector("#resumableItems").classList.add("hiddenScrollX"):t.querySelector("#resumableItems").classList.remove("hiddenScrollX"),e.createCardMenus(t.querySelector("#resumableItems"))},h.renderTab=function(){s()};var y=[],I=[],f=t.querySelector(".libraryViewNav"),T="tv.html",g=r.topParentId;g&&(T+="?topParentId="+g),o()?t.querySelector("#resumableItems").classList.add("hiddenScrollX"):t.querySelector("#resumableItems").classList.remove("hiddenScrollX"),e.createCardMenus(t.querySelector("#resumableItems")),e.configurePaperLibraryTabs(t,f,t.querySelectorAll(".pageTabContent"),[0,1,2,4,5,6]),f.addEventListener("beforetabchange",function(e){u(t,parseInt(e.detail.selectedTabIndex))}),f.addEventListener("tabchange",function(e){b(t,parseInt(e.detail.selectedTabIndex))}),t.addEventListener("viewbeforeshow",function(){if(!t.getAttribute("data-title")){var e=r.topParentId;e?ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){t.setAttribute("data-title",e.Name),LibraryMenu.setTitle(e.Name)}):(t.setAttribute("data-title",Globalize.translate("TabShows")),LibraryMenu.setTitle(Globalize.translate("TabShows")))}Events.on(MediaController,"playbackstop",m),Events.on(ApiClient,"websocketmessage",p)}),t.addEventListener("viewbeforehide",function(){Events.off(MediaController,"playbackstop",m),Events.off(ApiClient,"websocketmessage",p)}),t.addEventListener("viewdestroy",function(){y.forEach(function(e){e.destroy&&e.destroy()})})}});