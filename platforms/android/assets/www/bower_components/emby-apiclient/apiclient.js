define(["events"],function(e){return function(r,t,n,a,i,o){function u(r,t){e.trigger(y,"requestfail",[{url:r,status:t.status,errorCode:t.headers?t.headers["X-Application-Error-Code"]:null}])}function s(e){var r=e.headers||{};"json"==e.dataType&&(r.accept="application/json");var t={headers:r,method:e.type,credentials:"same-origin"},n=e.contentType;return e.data&&("string"==typeof e.data?t.body=e.data:(t.body=g(e.data),n=n||"application/x-www-form-urlencoded; charset=UTF-8")),n&&(r["Content-Type"]=n),e.timeout?l(e.url,t,e.timeout):fetch(e.url,t)}function l(e,r,t){return new Promise(function(n,a){var i=setTimeout(a,t);r=r||{},r.credentials="same-origin",fetch(e,r).then(function(e){clearTimeout(i),n(e)},function(){clearTimeout(i),a()})})}function g(e){var r=[];for(var t in e){var n=e[t];null!==n&&void 0!==n&&""!==n&&r.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}return r.join("&")}function c(e){var r=y.serverInfo(),t=e;return t--,0>t&&(t=MediaBrowser.ConnectionMode.Manual),MediaBrowser.ServerInfo.getServerAddress(r,t)?t:(t--,0>t&&(t=MediaBrowser.ConnectionMode.Manual),MediaBrowser.ServerInfo.getServerAddress(r,t)?t:e)}function f(e,r,t,n){t=c(t);var a=MediaBrowser.ServerInfo.getServerAddress(y.serverInfo(),t),i=t==MediaBrowser.ConnectionMode.Local?7e3:15e3;l(a+"/system/info/public",{method:"GET",accept:"application/json"},i).then(function(){y.serverInfo().LastConnectionMode=t,y.serverAddress(a),e()},function(){if(5>n){var a=c(t);setTimeout(function(){f(e,r,a,n+1)},300)}else r()})}function d(){return new Promise(function(e,r){setTimeout(function(){f(e,r,y.serverInfo().LastConnectionMode,0)},300)})}function v(r){if("UserDeleted"===r.MessageType)h=null;else if("UserUpdated"===r.MessageType||"UserConfigurationUpdated"===r.MessageType){var t=r.Data;t.Id==y.getCurrentUserId()&&(h=null)}e.trigger(y,"websocketmessage",[r])}function p(e){var r;return e.artist?(r="Artists/"+y.encodeName(e.artist),delete e.artist):e.person?(r="Persons/"+y.encodeName(e.person),delete e.person):e.genre?(r="Genres/"+y.encodeName(e.genre),delete e.genre):e.musicGenre?(r="MusicGenres/"+y.encodeName(e.musicGenre),delete e.musicGenre):e.gameGenre?(r="GameGenres/"+y.encodeName(e.gameGenre),delete e.gameGenre):e.studio?(r="Studios/"+y.encodeName(e.studio),delete e.studio):(r="Items/"+e.itemId,delete e.itemId),r}function w(e){var r=o||1;r&&(e.minScale&&(r=Math.max(e.minScale,r)),e.width&&(e.width=Math.round(e.width*r)),e.height&&(e.height=Math.round(e.height*r)),e.maxWidth&&(e.maxWidth=Math.round(e.maxWidth*r)),e.maxHeight&&(e.maxHeight=Math.round(e.maxHeight*r))),e.quality=e.quality||y.getDefaultImageQuality(e.type),y.normalizeImageOptions&&y.normalizeImageOptions(e)}if(!r)throw new Error("Must supply a serverAddress");var m,y=this,S={};y.serverAddress=function(t){if(null!=t){if(0!=t.toLowerCase().indexOf("http"))throw new Error("Invalid url: "+t);var n=t!=r;r=t,n&&e.trigger(this,"serveraddresschanged")}return r},y.serverInfo=function(e){return S=e||S};var h;y.getCurrentUser=function(){if(h)return new Promise(function(e){e(h)});var e=y.getCurrentUserId();return e?y.getUser(e).then(function(e){return h=e,e}):new Promise(function(e,r){r()})},y.getCurrentUserId=function(){return S.UserId},y.accessToken=function(){return S.AccessToken},y.deviceName=function(){return a},y.deviceId=function(){return i},y.appName=function(){return t},y.appVersion=function(){return n},y.clearAuthenticationInfo=function(){y.setAuthenticationInfo(null,null)},y.setAuthenticationInfo=function(e,r){h=null,S.AccessToken=e,S.UserId=r},y.encodeName=function(e){e=e.split("/").join("-"),e=e.split("&").join("-"),e=e.split("?").join("-");var r=g({name:e});return r.substring(r.indexOf("=")+1).replace("'","%27")},y.setRequestHeaders=function(e){var r=y.serverInfo();if(t){var o='MediaBrowser Client="'+t+'", Device="'+a+'", DeviceId="'+i+'", Version="'+n+'"',u=r.UserId;u&&(o+=', UserId="'+u+'"'),e["X-Emby-Authorization"]=o}var s=r.AccessToken;s&&(e["X-MediaBrowser-Token"]=s)},y.ajax=function(e,r){if(!e)throw new Error("Request cannot be null");return y.fetch(e,r)},y.fetch=function(e,r){if(!e)throw new Error("Request cannot be null");return e.headers=e.headers||{},r!==!1&&y.setRequestHeaders(e.headers),y.enableAutomaticNetworking===!1||"GET"!=e.type?s(e).then(function(r){return r.status<400?"json"==e.dataType||"application/json"==e.headers.accept?r.json():"text"==e.dataType||0==(r.headers.get("Content-Type")||"").toLowerCase().indexOf("text/")?r.text():r:(u(e.url,r),Promise.reject(r))},function(r){throw u(e.url,{}),r}):y.fetchWithFailover(e,!0)},y.getJSON=function(e,r){return y.fetch({url:e,type:"GET",dataType:"json",headers:{accept:"application/json"}},r)},y.fetchWithFailover=function(e,r){return e.timeout=3e4,s(e).then(function(r){return r.status<400?"json"==e.dataType||"application/json"==e.headers.accept?r.json():"text"==e.dataType||0==(r.headers.get("Content-Type")||"").toLowerCase().indexOf("text/")?r.text():r:(u(e.url,r),Promise.reject(r))},function(t){if(r){var n=y.serverAddress();return d().then(function(){return e.url=e.url.replace(n,y.serverAddress()),y.fetchWithFailover(e,!1)},function(r){throw u(e.url,{}),r})}throw u(e.url,{}),t})},y.get=function(e){return y.ajax({type:"GET",url:e})},y.getUrl=function(e,t){if(!e)throw new Error("Url name cannot be empty");var n=r;if(!n)throw new Error("serverAddress is yet not set");var a=n.toLowerCase();return-1==a.indexOf("/emby")&&-1==a.indexOf("/mediabrowser")&&(n+="/emby"),"/"!=e.charAt(0)&&(n+="/"),n+=e,t&&(t=g(t),t&&(n+="?"+t)),n},y.updateServerInfo=function(e,r){if(null==e)throw new Error("server cannot be null");if(null==r)throw new Error("connectionMode cannot be null");y.serverInfo(e);var t=MediaBrowser.ServerInfo.getServerAddress(e,r);if(!t)throw new Error("serverUrl cannot be null. serverInfo: "+JSON.stringify(e));y.serverAddress(t)},y.isWebSocketSupported=function(){try{return null!=WebSocket}catch(e){return!1}},y.openWebSocket=function(){var r=y.accessToken();if(!r)throw new Error("Cannot open web socket without access token.");var t=y.getUrl("socket").replace("emby/socket","embywebsocket").replace("http","ws");t+="?api_key="+r,t+="&deviceId="+i,m=new WebSocket(t),m.onmessage=function(e){e=JSON.parse(e.data),v(e)},m.onopen=function(){setTimeout(function(){e.trigger(y,"websocketopen")},0)},m.onerror=function(){setTimeout(function(){e.trigger(y,"websocketerror")},0)},m.onclose=function(){setTimeout(function(){e.trigger(y,"websocketclose")},0)}},y.closeWebSocket=function(){m&&m.readyState===WebSocket.OPEN&&m.close()},y.sendWebSocketMessage=function(e,r){var t={MessageType:e};r&&(t.Data=r),t=JSON.stringify(t),m.send(t)},y.isWebSocketOpen=function(){return m&&m.readyState===WebSocket.OPEN},y.isWebSocketOpenOrConnecting=function(){return m&&(m.readyState===WebSocket.OPEN||m.readyState===WebSocket.CONNECTING)},y.getProductNews=function(e){e=e||{};var r=y.getUrl("News/Product",e);return y.getJSON(r)},y.getDownloadSpeed=function(e){var r=y.getUrl("Playback/BitrateTest",{Size:e}),t=(new Date).getTime();return y.ajax({type:"GET",url:r,timeout:5e3}).then(function(){var r=((new Date).getTime()-t)/1e3,n=e/r,a=Math.round(8*n);return a})},y.detectBitrate=function(){return y.getDownloadSpeed(1e6).then(function(e){return 1e6>e?Math.round(.8*e):y.getDownloadSpeed(24e5).then(function(e){return Math.round(.8*e)})})},y.getItem=function(e,r){if(!r)throw new Error("null itemId");var t=y.getUrl(e?"Users/"+e+"/Items/"+r:"Items/"+r);return y.getJSON(t)},y.getRootFolder=function(e){if(!e)throw new Error("null userId");var r=y.getUrl("Users/"+e+"/Items/Root");return y.getJSON(r)},y.getNotificationSummary=function(e){if(!e)throw new Error("null userId");var r=y.getUrl("Notifications/"+e+"/Summary");return y.getJSON(r)},y.getNotifications=function(e,r){if(!e)throw new Error("null userId");var t=y.getUrl("Notifications/"+e,r||{});return y.getJSON(t)},y.markNotificationsRead=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null idList");var n=t?"Read":"Unread",a={UserId:e,Ids:r.join(",")},i=y.getUrl("Notifications/"+e+"/"+n,a);return y.ajax({type:"POST",url:i})},y.logout=function(){y.closeWebSocket();var e=function(){y.setAuthenticationInfo(null,null)};if(y.accessToken()){var r=y.getUrl("Sessions/Logout");return y.ajax({type:"POST",url:r}).then(e,e)}return new Promise(function(r){e(),r()})},y.getRemoteImageProviders=function(e){if(!e)throw new Error("null options");var r=p(e),t=y.getUrl(r+"/RemoteImages/Providers",e);return y.getJSON(t)},y.getAvailableRemoteImages=function(e){if(!e)throw new Error("null options");var r=p(e),t=y.getUrl(r+"/RemoteImages",e);return y.getJSON(t)},y.downloadRemoteImage=function(e){if(!e)throw new Error("null options");var r=p(e),t=y.getUrl(r+"/RemoteImages/Download",e);return y.ajax({type:"POST",url:t})},y.getLiveTvInfo=function(e){var r=y.getUrl("LiveTv/Info",e||{});return y.getJSON(r)},y.getLiveTvGuideInfo=function(e){var r=y.getUrl("LiveTv/GuideInfo",e||{});return y.getJSON(r)},y.getLiveTvChannel=function(e,r){if(!e)throw new Error("null id");var t={};r&&(t.userId=r);var n=y.getUrl("LiveTv/Channels/"+e,t);return y.getJSON(n)},y.getLiveTvChannels=function(e){var r=y.getUrl("LiveTv/Channels",e||{});return y.getJSON(r)},y.getLiveTvPrograms=function(e){return e=e||{},y.ajax(e.channelIds&&e.channelIds.length>1800?{type:"POST",url:y.getUrl("LiveTv/Programs"),data:JSON.stringify(e),contentType:"application/json",dataType:"json"}:{type:"GET",url:y.getUrl("LiveTv/Programs",e),dataType:"json"})},y.getLiveTvRecommendedPrograms=function(e){return e=e||{},y.ajax({type:"GET",url:y.getUrl("LiveTv/Programs/Recommended",e),dataType:"json"})},y.getLiveTvRecordings=function(e){var r=y.getUrl("LiveTv/Recordings",e||{});return y.getJSON(r)},y.getLiveTvRecordingGroups=function(e){var r=y.getUrl("LiveTv/Recordings/Groups",e||{});return y.getJSON(r)},y.getLiveTvRecordingGroup=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/Recordings/Groups/"+e);return y.getJSON(r)},y.getLiveTvRecording=function(e,r){if(!e)throw new Error("null id");var t={};r&&(t.userId=r);var n=y.getUrl("LiveTv/Recordings/"+e,t);return y.getJSON(n)},y.getLiveTvProgram=function(e,r){if(!e)throw new Error("null id");var t={};r&&(t.userId=r);var n=y.getUrl("LiveTv/Programs/"+e,t);return y.getJSON(n)},y.deleteLiveTvRecording=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/Recordings/"+e);return y.ajax({type:"DELETE",url:r})},y.cancelLiveTvTimer=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/Timers/"+e);return y.ajax({type:"DELETE",url:r})},y.getLiveTvTimers=function(e){var r=y.getUrl("LiveTv/Timers",e||{});return y.getJSON(r)},y.getLiveTvTimer=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/Timers/"+e);return y.getJSON(r)},y.getNewLiveTvTimerDefaults=function(e){e=e||{};var r=y.getUrl("LiveTv/Timers/Defaults",e);return y.getJSON(r)},y.createLiveTvTimer=function(e){if(!e)throw new Error("null item");var r=y.getUrl("LiveTv/Timers");return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updateLiveTvTimer=function(e){if(!e)throw new Error("null item");var r=y.getUrl("LiveTv/Timers/"+e.Id);return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.resetLiveTvTuner=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/Tuners/"+e+"/Reset");return y.ajax({type:"POST",url:r})},y.getLiveTvSeriesTimers=function(e){var r=y.getUrl("LiveTv/SeriesTimers",e||{});return y.getJSON(r)},y.getFileOrganizationResults=function(e){var r=y.getUrl("Library/FileOrganization",e||{});return y.getJSON(r)},y.deleteOriginalFileFromOrganizationResult=function(e){var r=y.getUrl("Library/FileOrganizations/"+e+"/File");return y.ajax({type:"DELETE",url:r})},y.clearOrganizationLog=function(){var e=y.getUrl("Library/FileOrganizations");return y.ajax({type:"DELETE",url:e})},y.performOrganization=function(e){var r=y.getUrl("Library/FileOrganizations/"+e+"/Organize");return y.ajax({type:"POST",url:r})},y.performEpisodeOrganization=function(e,r){var t=y.getUrl("Library/FileOrganizations/"+e+"/Episode/Organize",r||{});return y.ajax({type:"POST",url:t})},y.getLiveTvSeriesTimer=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/SeriesTimers/"+e);return y.getJSON(r)},y.cancelLiveTvSeriesTimer=function(e){if(!e)throw new Error("null id");var r=y.getUrl("LiveTv/SeriesTimers/"+e);return y.ajax({type:"DELETE",url:r})},y.createLiveTvSeriesTimer=function(e){if(!e)throw new Error("null item");var r=y.getUrl("LiveTv/SeriesTimers");return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updateLiveTvSeriesTimer=function(e){if(!e)throw new Error("null item");var r=y.getUrl("LiveTv/SeriesTimers/"+e.Id);return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.getRegistrationInfo=function(e){var r=y.getUrl("Registrations/"+e);return y.getJSON(r)},y.getSystemInfo=function(){var e=y.getUrl("System/Info");return y.getJSON(e)},y.getPublicSystemInfo=function(){var e=y.getUrl("System/Info/Public");return y.getJSON(e,!1)},y.getInstantMixFromItem=function(e,r){var t=y.getUrl("Items/"+e+"/InstantMix",r);return y.getJSON(t)},y.getEpisodes=function(e,r){var t=y.getUrl("Shows/"+e+"/Episodes",r);return y.getJSON(t)},y.getDisplayPreferences=function(e,r,t){var n=y.getUrl("DisplayPreferences/"+e,{userId:r,client:t});return y.getJSON(n)},y.updateDisplayPreferences=function(e,r,t,n){var a=y.getUrl("DisplayPreferences/"+e,{userId:t,client:n});return y.ajax({type:"POST",url:a,data:JSON.stringify(r),contentType:"application/json"})},y.getSeasons=function(e,r){var t=y.getUrl("Shows/"+e+"/Seasons",r);return y.getJSON(t)},y.getSimilarItems=function(e,r){var t=y.getUrl("Items/"+e+"/Similar",r);return y.getJSON(t)},y.getCultures=function(){var e=y.getUrl("Localization/cultures");return y.getJSON(e)},y.getCountries=function(){var e=y.getUrl("Localization/countries");return y.getJSON(e)},y.getPluginSecurityInfo=function(){var e=y.getUrl("Plugins/SecurityInfo");return y.getJSON(e)},y.getDirectoryContents=function(e,r){if(!e)throw new Error("null path");if("string"!=typeof e)throw new Error("invalid path");r=r||{},r.path=e;var t=y.getUrl("Environment/DirectoryContents",r);return y.getJSON(t)},y.getNetworkShares=function(e){if(!e)throw new Error("null path");var r={};r.path=e;var t=y.getUrl("Environment/NetworkShares",r);return y.getJSON(t)},y.getParentPath=function(e){if(!e)throw new Error("null path");var r={};r.path=e;var t=y.getUrl("Environment/ParentPath",r);return y.ajax({type:"GET",url:t,dataType:"text"})},y.getDrives=function(){var e=y.getUrl("Environment/Drives");return y.getJSON(e)},y.getNetworkDevices=function(){var e=y.getUrl("Environment/NetworkDevices");return y.getJSON(e)},y.cancelPackageInstallation=function(e){if(!e)throw new Error("null installationId");var r=y.getUrl("Packages/Installing/"+e);return y.ajax({type:"DELETE",url:r})},y.refreshItem=function(e,r){if(!e)throw new Error("null itemId");var t=y.getUrl("Items/"+e+"/Refresh",r||{});return y.ajax({type:"POST",url:t})},y.installPlugin=function(e,r,t,n){if(!e)throw new Error("null name");if(!t)throw new Error("null updateClass");var a={updateClass:t,AssemblyGuid:r};n&&(a.version=n);var i=y.getUrl("Packages/Installed/"+e,a);return y.ajax({type:"POST",url:i})},y.restartServer=function(){var e=y.getUrl("System/Restart");return y.ajax({type:"POST",url:e})},y.shutdownServer=function(){var e=y.getUrl("System/Shutdown");return y.ajax({type:"POST",url:e})},y.getPackageInfo=function(e,r){if(!e)throw new Error("null name");var t={AssemblyGuid:r},n=y.getUrl("Packages/"+e,t);return y.getJSON(n)},y.getAvailableApplicationUpdate=function(){var e=y.getUrl("Packages/Updates",{PackageType:"System"});return y.getJSON(e)},y.getAvailablePluginUpdates=function(){var e=y.getUrl("Packages/Updates",{PackageType:"UserInstalled"});return y.getJSON(e)},y.getVirtualFolders=function(){var e="Library/VirtualFolders";return e=y.getUrl(e),y.getJSON(e)},y.getPhysicalPaths=function(){var e=y.getUrl("Library/PhysicalPaths");return y.getJSON(e)},y.getServerConfiguration=function(){var e=y.getUrl("System/Configuration");return y.getJSON(e)},y.getDevicesOptions=function(){var e=y.getUrl("System/Configuration/devices");return y.getJSON(e)},y.getContentUploadHistory=function(){var e=y.getUrl("Devices/CameraUploads",{DeviceId:y.deviceId()});return y.getJSON(e)},y.getNamedConfiguration=function(e){var r=y.getUrl("System/Configuration/"+e);return y.getJSON(r)},y.getScheduledTasks=function(e){e=e||{};var r=y.getUrl("ScheduledTasks",e);return y.getJSON(r)},y.startScheduledTask=function(e){if(!e)throw new Error("null id");var r=y.getUrl("ScheduledTasks/Running/"+e);return y.ajax({type:"POST",url:r})},y.getScheduledTask=function(e){if(!e)throw new Error("null id");var r=y.getUrl("ScheduledTasks/"+e);return y.getJSON(r)},y.getNextUpEpisodes=function(e){var r=y.getUrl("Shows/NextUp",e);return y.getJSON(r)},y.stopScheduledTask=function(e){if(!e)throw new Error("null id");var r=y.getUrl("ScheduledTasks/Running/"+e);return y.ajax({type:"DELETE",url:r})},y.getPluginConfiguration=function(e){if(!e)throw new Error("null Id");var r=y.getUrl("Plugins/"+e+"/Configuration");return y.getJSON(r)},y.getAvailablePlugins=function(e){e=e||{},e.PackageType="UserInstalled";var r=y.getUrl("Packages",e);return y.getJSON(r)},y.uninstallPlugin=function(e){if(!e)throw new Error("null Id");var r=y.getUrl("Plugins/"+e);return y.ajax({type:"DELETE",url:r})},y.removeVirtualFolder=function(e,r){if(!e)throw new Error("null name");var t="Library/VirtualFolders";return t=y.getUrl(t,{refreshLibrary:r?!0:!1,name:e}),y.ajax({type:"DELETE",url:t})},y.addVirtualFolder=function(e,r,t,n){if(!e)throw new Error("null name");var a={};r&&(a.collectionType=r),a.refreshLibrary=t?!0:!1,a.name=e;var i="Library/VirtualFolders";return i=y.getUrl(i,a),y.ajax({type:"POST",url:i,data:JSON.stringify({Paths:n}),contentType:"application/json"})},y.renameVirtualFolder=function(e,r,t){if(!e)throw new Error("null name");var n="Library/VirtualFolders/Name";return n=y.getUrl(n,{refreshLibrary:t?!0:!1,newName:r,name:e}),y.ajax({type:"POST",url:n})},y.addMediaPath=function(e,r,t){if(!e)throw new Error("null virtualFolderName");if(!r)throw new Error("null mediaPath");var n="Library/VirtualFolders/Paths";return n=y.getUrl(n,{refreshLibrary:t?!0:!1,path:r,name:e}),y.ajax({type:"POST",url:n})},y.removeMediaPath=function(e,r,t){if(!e)throw new Error("null virtualFolderName");if(!r)throw new Error("null mediaPath");var n="Library/VirtualFolders/Paths";return n=y.getUrl(n,{refreshLibrary:t?!0:!1,path:r,name:e}),y.ajax({type:"DELETE",url:n})},y.deleteUser=function(e){if(!e)throw new Error("null id");var r=y.getUrl("Users/"+e);return y.ajax({type:"DELETE",url:r})},y.deleteUserImage=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null imageType");var n=y.getUrl("Users/"+e+"/Images/"+r);return null!=t&&(n+="/"+t),y.ajax({type:"DELETE",url:n})},y.deleteItemImage=function(e,r,t){if(!r)throw new Error("null imageType");var n=y.getUrl("Items/"+e+"/Images");return n+="/"+r,null!=t&&(n+="/"+t),y.ajax({type:"DELETE",url:n})},y.deleteItem=function(e){if(!e)throw new Error("null itemId");var r=y.getUrl("Items/"+e);return y.ajax({type:"DELETE",url:r})},y.stopActiveEncodings=function(e){var r={deviceId:i};e&&(r.PlaySessionId=e);var t=y.getUrl("Videos/ActiveEncodings",r);return y.ajax({type:"DELETE",url:t})},y.reportCapabilities=function(e){var r=y.getUrl("Sessions/Capabilities/Full");return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updateItemImageIndex=function(e,r,t,n){if(!r)throw new Error("null imageType");var a={newIndex:n},i=y.getUrl("Items/"+e+"/Images/"+r+"/"+t+"/Index",a);return y.ajax({type:"POST",url:i})},y.getItemImageInfos=function(e){var r=y.getUrl("Items/"+e+"/Images");return y.getJSON(r)},y.getCriticReviews=function(e,r){if(!e)throw new Error("null itemId");var t=y.getUrl("Items/"+e+"/CriticReviews",r);return y.getJSON(t)},y.getSessions=function(e){var r=y.getUrl("Sessions",e);return y.getJSON(r)},y.uploadUserImage=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null imageType");if(!t)throw new Error("File must be an image.");if("image/png"!=t.type&&"image/jpeg"!=t.type&&"image/jpeg"!=t.type)throw new Error("File must be an image.");return new Promise(function(n,a){var i=new FileReader;i.onerror=function(){a()},i.onabort=function(){a()},i.onload=function(i){var o=i.target.result.split(",")[1],u=y.getUrl("Users/"+e+"/Images/"+r);y.ajax({type:"POST",url:u,data:o,contentType:"image/"+t.name.substring(t.name.lastIndexOf(".")+1)}).then(function(e){n(e)},function(){a()})},i.readAsDataURL(t)})},y.uploadItemImage=function(e,r,t){if(!e)throw new Error("null itemId");if(!r)throw new Error("null imageType");if(!t)throw new Error("File must be an image.");if("image/png"!=t.type&&"image/jpeg"!=t.type&&"image/jpeg"!=t.type)throw new Error("File must be an image.");var n=y.getUrl("Items/"+e+"/Images");return n+="/"+r,new Promise(function(e,r){var a=new FileReader;a.onerror=function(){r()},a.onabort=function(){r()},a.onload=function(a){var i=a.target.result.split(",")[1];y.ajax({type:"POST",url:n,data:i,contentType:"image/"+t.name.substring(t.name.lastIndexOf(".")+1)}).then(function(r){e(r)},function(){r()})},a.readAsDataURL(t)})},y.getInstalledPlugins=function(){var e={},r=y.getUrl("Plugins",e);return y.getJSON(r)},y.getUser=function(e){if(!e)throw new Error("Must supply a userId");var r=y.getUrl("Users/"+e);return y.getJSON(r)},y.getOfflineUser=function(e){if(!e)throw new Error("Must supply a userId");var r=y.getUrl("Users/"+e+"/Offline");return y.getJSON(r)},y.getStudio=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("Studios/"+y.encodeName(e),t);return y.getJSON(n)},y.getGenre=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("Genres/"+y.encodeName(e),t);return y.getJSON(n)},y.getMusicGenre=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("MusicGenres/"+y.encodeName(e),t);return y.getJSON(n)},y.getGameGenre=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("GameGenres/"+y.encodeName(e),t);return y.getJSON(n)},y.getArtist=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("Artists/"+y.encodeName(e),t);return y.getJSON(n)},y.getPerson=function(e,r){if(!e)throw new Error("null name");var t={};r&&(t.userId=r);var n=y.getUrl("Persons/"+y.encodeName(e),t);return y.getJSON(n)},y.getPublicUsers=function(){var e=y.getUrl("users/public");return y.ajax({type:"GET",url:e,dataType:"json"},!1)},y.getUsers=function(e){var r=y.getUrl("users",e||{});return y.getJSON(r)},y.getParentalRatings=function(){var e=y.getUrl("Localization/ParentalRatings");return y.getJSON(e)},y.getDefaultImageQuality=function(e){return"backdrop"==e.toLowerCase()?80:90},y.getUserImageUrl=function(e,r){if(!e)throw new Error("null userId");r=r||{};var t="Users/"+e+"/Images/"+r.type;return null!=r.index&&(t+="/"+r.index),w(r),delete r.type,delete r.index,y.getUrl(t,r)},y.getImageUrl=function(e,r){if(!e)throw new Error("itemId cannot be empty");r=r||{};var t="Items/"+e+"/Images/"+r.type;return null!=r.index&&(t+="/"+r.index),r.quality=r.quality||y.getDefaultImageQuality(r.type),y.normalizeImageOptions&&y.normalizeImageOptions(r),delete r.type,delete r.index,y.getUrl(t,r)},y.getScaledImageUrl=function(e,r){if(!e)throw new Error("itemId cannot be empty");r=r||{};var t="Items/"+e+"/Images/"+r.type;return null!=r.index&&(t+="/"+r.index),w(r),delete r.type,delete r.index,delete r.minScale,y.getUrl(t,r)},y.getThumbImageUrl=function(e,r){if(!e)throw new Error("null item");return r=r||{},r.imageType="thumb",e.ImageTags&&e.ImageTags.Thumb?(r.tag=e.ImageTags.Thumb,y.getImageUrl(e.Id,r)):e.ParentThumbItemId?(r.tag=e.ImageTags.ParentThumbImageTag,y.getImageUrl(e.ParentThumbItemId,r)):null},y.authenticateUserByName=function(e,r){return new Promise(function(t,n){if(!e)return void n();var a=y.getUrl("Users/authenticatebyname");require(["cryptojs-sha1"],function(){var i={password:CryptoJS.SHA1(r||"").toString(),Username:e};y.ajax({type:"POST",url:a,data:JSON.stringify(i),dataType:"json",contentType:"application/json"}).then(function(e){y.onAuthenticated&&y.onAuthenticated(y,e),t(e)},n)})})},y.updateUserPassword=function(e,r,t){return new Promise(function(n,a){if(!e)return void a();var i=y.getUrl("Users/"+e+"/Password");require(["cryptojs-sha1"],function(){y.ajax({type:"POST",url:i,data:{currentPassword:CryptoJS.SHA1(r).toString(),newPassword:CryptoJS.SHA1(t).toString()}}).then(n,a)})})},y.updateEasyPassword=function(e,r){return new Promise(function(t,n){if(!e)return void n();var a=y.getUrl("Users/"+e+"/EasyPassword");require(["cryptojs-sha1"],function(){y.ajax({type:"POST",url:a,data:{newPassword:CryptoJS.SHA1(r).toString()}}).then(t,n)})})},y.resetUserPassword=function(e){if(!e)throw new Error("null userId");var r=y.getUrl("Users/"+e+"/Password"),t={};return t.resetPassword=!0,y.ajax({type:"POST",url:r,data:t})},y.resetEasyPassword=function(e){if(!e)throw new Error("null userId");var r=y.getUrl("Users/"+e+"/EasyPassword"),t={};return t.resetPassword=!0,y.ajax({type:"POST",url:r,data:t})},y.updateServerConfiguration=function(e){if(!e)throw new Error("null configuration");var r=y.getUrl("System/Configuration");return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updateNamedConfiguration=function(e,r){if(!r)throw new Error("null configuration");var t=y.getUrl("System/Configuration/"+e);return y.ajax({type:"POST",url:t,data:JSON.stringify(r),contentType:"application/json"})},y.updateItem=function(e){if(!e)throw new Error("null item");var r=y.getUrl("Items/"+e.Id);return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updatePluginSecurityInfo=function(e){var r=y.getUrl("Plugins/SecurityInfo");return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.createUser=function(e){var r=y.getUrl("Users/New");return y.ajax({type:"POST",url:r,data:{Name:e},dataType:"json"})},y.updateUser=function(e){if(!e)throw new Error("null user");var r=y.getUrl("Users/"+e.Id);return y.ajax({type:"POST",url:r,data:JSON.stringify(e),contentType:"application/json"})},y.updateUserPolicy=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null policy");var t=y.getUrl("Users/"+e+"/Policy");return y.ajax({type:"POST",url:t,data:JSON.stringify(r),contentType:"application/json"})},y.updateUserConfiguration=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null configuration");var t=y.getUrl("Users/"+e+"/Configuration");return y.ajax({type:"POST",url:t,data:JSON.stringify(r),contentType:"application/json"})},y.updateScheduledTaskTriggers=function(e,r){if(!e)throw new Error("null id");if(!r)throw new Error("null triggers");var t=y.getUrl("ScheduledTasks/"+e+"/Triggers");return y.ajax({type:"POST",url:t,data:JSON.stringify(r),contentType:"application/json"})},y.updatePluginConfiguration=function(e,r){if(!e)throw new Error("null Id");if(!r)throw new Error("null configuration");var t=y.getUrl("Plugins/"+e+"/Configuration");return y.ajax({type:"POST",url:t,data:JSON.stringify(r),contentType:"application/json"})},y.getAncestorItems=function(e,r){if(!e)throw new Error("null itemId");var t={};r&&(t.userId=r);var n=y.getUrl("Items/"+e+"/Ancestors",t);return y.getJSON(n)},y.getItems=function(e,r){var t;return t="string"==(typeof e).toString().toLowerCase()?y.getUrl("Users/"+e+"/Items",r):y.getUrl("Items",r),y.getJSON(t)},y.getChannels=function(e){return y.getJSON(y.getUrl("Channels",e||{}))},y.getUserViews=function(e,r){e=e||{};var t=y.getUrl("Users/"+(r||y.getCurrentUserId())+"/Views",e);return y.getJSON(t)},y.getArtists=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("Artists",r);return y.getJSON(t)},y.getAlbumArtists=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("Artists/AlbumArtists",r);return y.getJSON(t)},y.getGenres=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("Genres",r);return y.getJSON(t)},y.getMusicGenres=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("MusicGenres",r);return y.getJSON(t)},y.getGameGenres=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("GameGenres",r);return y.getJSON(t)},y.getPeople=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("Persons",r);return y.getJSON(t)},y.getStudios=function(e,r){if(!e)throw new Error("null userId");r=r||{},r.userId=e;var t=y.getUrl("Studios",r);return y.getJSON(t)},y.getLocalTrailers=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var t=y.getUrl("Users/"+e+"/Items/"+r+"/LocalTrailers");return y.getJSON(t)},y.getAdditionalVideoParts=function(e,r){if(!r)throw new Error("null itemId");var t={};e&&(t.userId=e);var n=y.getUrl("Videos/"+r+"/AdditionalParts",t);return y.getJSON(n)},y.getThemeMedia=function(e,r,t){if(!r)throw new Error("null itemId");var n={};e&&(n.userId=e),n.InheritFromParent=t||!1;var a=y.getUrl("Items/"+r+"/ThemeMedia",n);return y.getJSON(a)},y.getSearchHints=function(e){var r=y.getUrl("Search/Hints",e);return y.getJSON(r)},y.getSpecialFeatures=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var t=y.getUrl("Users/"+e+"/Items/"+r+"/SpecialFeatures");return y.getJSON(t)},y.getDateParamValue=function(e){function r(e){return 10>e?"0"+e:e}var t=e;return""+t.getFullYear()+r(t.getMonth()+1)+r(t.getDate())+r(t.getHours())+r(t.getMinutes())+r(t.getSeconds())},y.markPlayed=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var n={};t&&(n.DatePlayed=y.getDateParamValue(t));var a=y.getUrl("Users/"+e+"/PlayedItems/"+r,n);return y.ajax({type:"POST",url:a,dataType:"json"})},y.markUnplayed=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var t=y.getUrl("Users/"+e+"/PlayedItems/"+r);return y.ajax({type:"DELETE",url:t,dataType:"json"})},y.updateFavoriteStatus=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var n=y.getUrl("Users/"+e+"/FavoriteItems/"+r),a=t?"POST":"DELETE";return y.ajax({type:a,url:n,dataType:"json"})},y.updateUserItemRating=function(e,r,t){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var n=y.getUrl("Users/"+e+"/Items/"+r+"/Rating",{likes:t});return y.ajax({type:"POST",url:n,dataType:"json"})},y.getItemCounts=function(e){var r={};e&&(r.userId=e);var t=y.getUrl("Items/Counts",r);return y.getJSON(t)},y.clearUserItemRating=function(e,r){if(!e)throw new Error("null userId");if(!r)throw new Error("null itemId");var t=y.getUrl("Users/"+e+"/Items/"+r+"/Rating");return y.ajax({type:"DELETE",url:t,dataType:"json"})},y.reportPlaybackStart=function(e){if(!e)throw new Error("null options");var r=y.getUrl("Sessions/Playing");return y.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:r})},y.reportPlaybackProgress=function(e){if(!e)throw new Error("null options");if(y.isWebSocketOpen())return new Promise(function(r){var t=JSON.stringify(e);y.sendWebSocketMessage("ReportPlaybackProgress",t),r()});var r=y.getUrl("Sessions/Playing/Progress");return y.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:r})},y.reportOfflineActions=function(e){if(!e)throw new Error("null actions");var r=y.getUrl("Sync/OfflineActions");return y.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:r})},y.syncData=function(e){if(!e)throw new Error("null data");var r=y.getUrl("Sync/Data");return y.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:r,dataType:"json"})
},y.getReadySyncItems=function(e){if(!e)throw new Error("null deviceId");var r=y.getUrl("Sync/Items/Ready",{TargetId:e});return y.getJSON(r)},y.reportSyncJobItemTransferred=function(e){if(!e)throw new Error("null syncJobItemId");var r=y.getUrl("Sync/JobItems/"+e+"/Transferred");return y.ajax({type:"POST",url:r})},y.reportPlaybackStopped=function(e){if(!e)throw new Error("null options");var r=y.getUrl("Sessions/Playing/Stopped");return y.ajax({type:"POST",data:JSON.stringify(e),contentType:"application/json",url:r})},y.sendPlayCommand=function(e,r){if(!e)throw new Error("null sessionId");if(!r)throw new Error("null options");var t=y.getUrl("Sessions/"+e+"/Playing",r);return y.ajax({type:"POST",url:t})},y.sendCommand=function(e,r){if(!e)throw new Error("null sessionId");if(!r)throw new Error("null command");var t=y.getUrl("Sessions/"+e+"/Command"),n={type:"POST",url:t};return n.data=JSON.stringify(r),n.contentType="application/json",y.ajax(n)},y.sendMessageCommand=function(e,r){if(!e)throw new Error("null sessionId");if(!r)throw new Error("null options");var t=y.getUrl("Sessions/"+e+"/Message",r);return y.ajax({type:"POST",url:t})},y.sendPlayStateCommand=function(e,r,t){if(!e)throw new Error("null sessionId");if(!r)throw new Error("null command");var n=y.getUrl("Sessions/"+e+"/Playing/"+r,t||{});return y.ajax({type:"POST",url:n})},y.createPackageReview=function(e){var r=y.getUrl("Packages/Reviews/"+e.id,e);return y.ajax({type:"POST",url:r})},y.getPackageReviews=function(e,r,t,n){if(!e)throw new Error("null packageId");var a={};r&&(a.MinRating=r),t&&(a.MaxRating=t),n&&(a.Limit=n);var i=y.getUrl("Packages/"+e+"/Reviews",a);return y.getJSON(i)}}});