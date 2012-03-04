villo.extend({
	suggest: {
		//* @public
		// Suggest usernames based on fragments.
		username: function(inUser){
			//We don't want unnecessary strain on the server.
			if(inUser && inUser.username && inUser.callback && inUser.username !== ""){
				villo.ajax("https://api.villo.me/profile.php", {
					method: 'post',
					parameters: {
						api: villo.apiKey,
						appid: villo.app.id,
						type: "search",
						username: inUser.username
					},
					onSuccess: function(transport){
						if (!transport == "") {
							var tmprsp = JSON.parse(transport);
							if (tmprsp.profile) {
								inUser.callback(tmprsp);
							} else 
								if (transport == 33 || transport == 66 || transport == 99) {
									inUser.callback(transport);
								} else {
									inUser.callback(33);
								}
						} else {
							inUser.callback(33);
						}
					},
					onFailure: function(){
						inUser.callback(33);
					}
				});
			}else{
				return false;
			}
		}
	}
});
