// The local storage of the windows stores in my_local_storage
let my_local_storage = window.localStorage;

// This function prints the user information in the webpage
function data_printer(data, username, user_type){
    // Removing last user-unavailable local storage messages
    if(document.getElementById("local_storage_message") != null){
        document.getElementById("local_storage_message").remove();

    }
    // Converting stored string in local storage to JSON object
    if(user_type == "old"){
        data = JSON.parse(data);

    }
    let user_favorite_language;
    // Checking if the input username is available or not
    if(data["message"] != undefined){
        // Removing last user-unavailable message
        if(document.getElementById("user_unavailable_block") != null){
            document.getElementById("user_unavailable_block").remove();
        }
        let new_child = document.createElement("div");
        new_child.id = "user_unavailable_block";
        new_child.innerHTML = "Input username is not available!";
        new_child.style.display = "block";
        new_child.style.width = "100%";
        new_child.style.color = "red";
        new_child.style.textAlign = "center";
        let button_child = document.getElementById("submit_button");
        let parent = document.getElementById("search_block");
        parent.insertBefore(new_child, button_child);


    }
    else{
        // Removing last user-unavailable message
        if(document.getElementById("user_unavailable_block") != null){
            document.getElementById("user_unavailable_block").remove();

        }
        // printing user information
        if(data.avatar_url != null){
            document.getElementById("user_image").src = data.avatar_url;

        }
        else{
            document.getElementById("user_image").alt = "image unavailable";

        }
        if(data.name != null){
            document.getElementById("user_full_name").style.color = "black";
            document.getElementById("user_full_name").innerHTML = data.name;

        }
        else{
            document.getElementById("user_full_name").style.color = "black";
            document.getElementById("user_full_name").innerHTML = "full name unavailable";

        }
        if(data.blog != ""){

            let new_child = document.createElement("a");
            new_child.id = "user_blog_address";
            new_child.href = data.blog;
            new_child.innerHTML = data.blog;
            new_child.target = "_blank";
            let parent = document.getElementById("user_personal_info");
            let old_child = document.getElementById("user_blog_address");
            parent.replaceChild(new_child, old_child);


        }
        else{
            let new_child = document.createElement("div");
            new_child.id = "user_blog_address";
            new_child.innerHTML = "blog address unavailable";
            let parent = document.getElementById("user_personal_info");
            let old_child = document.getElementById("user_blog_address");
            parent.replaceChild(new_child, old_child);


        }
        if(data.location != null){
            document.getElementById("user_location").innerHTML = data.location;

        }
        else{
            document.getElementById("user_location").innerHTML = "location unavailable";

        }
        let user_bio_block_element = document.getElementById("user_bio_block");
        user_bio_block_element.innerHTML = "";
        if(data.bio != null){
            let user_bio = data.bio.toString();
            let bio_line = "";
            //printing the bio in new lines
            while(user_bio.search("\n") != -1){
                let index = user_bio.search("\n");
                for(let i = 0;i <= index;++i){
                    bio_line += user_bio.charAt(i);

                }
                let new_user_bio = "";
                for(let i = index + 1;i < user_bio.length;++i) {
                    new_user_bio += user_bio.charAt(i);


                }
                user_bio = new_user_bio;
                let new_child = document.createElement("div");
                new_child.innerHTML = bio_line;
                bio_line = "";
                user_bio_block_element.appendChild(new_child);


            }
            if(user_bio != ""){
                let new_child = document.createElement("div");
                new_child.innerHTML = user_bio;
                user_bio_block_element.appendChild(new_child);

            }

        }

        else{
            let new_child = document.createElement("div");
            new_child.innerHTML = "biography unavailable";
            user_bio_block_element.appendChild(new_child);

        }

        if(user_type == "old"){
            document.getElementById("user_favorite_language").innerHTML = "Favorite Programming Language(s): " +
                my_local_storage[username + "_favorite_language"];

        }
        else{
            let repositories_url = data.repos_url;
            fetch(repositories_url)
                .then(rspn => rspn.json())
                .then(output => {
                    let user_repos = []
                    // Finding repositories with available Language field
                    for(let i = 0;i < output.length;++i){
                        if(output[i].language != null){
                            let temp_array = [];
                            let temp_date = output[i].pushed_at;

                            // Parsing the pushed_at date
                            let date = "";
                            let month = "";
                            let year = "";
                            for(let j = 0;j < 4;++j){
                                year += temp_date.charAt(j);

                            }
                            year = parseInt(year);
                            if(temp_date.charAt(5) == '0'){
                                month += temp_date.charAt(6);

                            }
                            else{
                                month += temp_date.charAt(5);
                                month += temp_date.charAt(6);
                            }
                            month = parseInt(month);
                            if(temp_date.charAt(8) == '0'){
                                date += temp_date.charAt(9);

                            }
                            else{
                                date += temp_date.charAt(8);
                                date += temp_date.charAt(9);
                            }
                            date = parseInt(date);
                            let temp_date_object = new Date(year, month, date);
                            temp_array.push(output[i]);
                            temp_array.push(temp_date_object);
                            user_repos.push(temp_array);

                        }

                    }
                    if(user_repos.length == 0){
                        document.getElementById("user_favorite_language").innerHTML = "Favorite Programming Language(s): " + "-";
                        // Storing user favorite language in local storage for later reuse
                        my_local_storage.setItem(username + "_favorite_language", "-");


                    }
                    else{
                        // Sorting the repositories according to pushed_at date
                        for(let i = user_repos.length - 1;i >= 1;--i){
                            for(let j = 0;j < i;++j){
                                if(user_repos[j][1] > user_repos[j + 1][1]){
                                    let temp = user_repos[j + 1];
                                    user_repos[j + 1] = user_repos[j];
                                    user_repos[j] = temp;

                                }

                            }

                        }
                        // Finding last recent repositories
                        let recent_five = [];
                        // Some users may have less than five repositories, this part of the code is handling this issue
                        if(user_repos.length < 5){
                            for(let i = 0;i < user_repos.length;++i){
                                recent_five.push(user_repos[i]);

                            }


                        }
                        else{
                            for(let counter = 1;counter <= 5;++counter){
                                recent_five.push(user_repos[user_repos.length - counter]);

                            }

                        }
                        // Finding last five repository languages and their number of repetition
                        let user_top_five_languages = [];
                        for(let i = 0;i < recent_five.length;++i){
                            let exist = false;
                            for(let j = 0;j < user_top_five_languages.length;++j){
                                if(recent_five[i][0].language == user_top_five_languages[j][0]){
                                    exist = true;
                                    break;


                                }

                            }
                            if(!exist){
                                let temp_array = [];
                                temp_array.push(recent_five[i][0].language);
                                temp_array.push(1);

                                for(let j = i + 1;j < recent_five.length;++j){
                                    if(recent_five[j][0].language == temp_array[0]){
                                        ++temp_array[1];

                                    }

                                }
                                user_top_five_languages.push(temp_array);

                            }

                        }
                        // Sorting user top five languages
                        for(let i = user_top_five_languages.length - 1;i >= 1;--i){
                            for(let j = 0;j < i;++j){
                                if(user_top_five_languages[j][1] > user_top_five_languages[j + 1][1]){
                                    let temp = user_top_five_languages[j + 1];
                                    user_top_five_languages[j + 1] = user_top_five_languages[j];
                                    user_top_five_languages[j] = temp;

                                }

                            }

                        }


                        let maximum_count = user_top_five_languages[user_top_five_languages.length - 1][1];
                        user_favorite_language = user_top_five_languages[user_top_five_languages.length - 1][0];
                        for(let i = 0;i < user_top_five_languages.length - 1;++i){
                            if(user_top_five_languages[i][1] == maximum_count){
                                user_favorite_language += ", " + user_top_five_languages[i][0];

                            }


                        }
                        // Adding user favorite language(s) to HTML
                        document.getElementById("user_favorite_language").innerHTML = "Favorite Programming Language(s): " + user_favorite_language;
                        // Storing user favorite language in local storage for later reuse
                        my_local_storage.setItem(username + "_favorite_language", user_favorite_language);

                    }


                });

        }

    }
    if(user_type == "new"){
        my_local_storage.setItem(username, JSON.stringify(data));
    }


}


//This function sends fetch requests to get user info
function fetch_sender(username){
    // Checking if the input username information is available in the local storage or not
    if(my_local_storage[username] != undefined){
        data_printer(my_local_storage[username], username, "old");
        // Checking if the input username is available in Github or not
        if(JSON.parse(my_local_storage[username]).message != undefined){
            let parent = document.getElementById("search_block");
            let new_child = document.createElement("div");
            new_child.id = "local_storage_message";
            new_child.style.color = "grey";
            new_child.innerHTML = "(from local storage)";
            new_child.style.display = "block";
            new_child.style.textAlign = "center";
            let old_child = document.getElementById("submit_button");
            parent.insertBefore(new_child, old_child);


        }
        else{
            let parent = document.getElementById("user_personal_info");
            let new_child = document.createElement("div");
            new_child.id = "local_storage_message";
            new_child.style.color = "grey";
            new_child.innerHTML = "(from local storage)";
            parent.appendChild(new_child);



        }


    }
    else{
        let url = "https://api.github.com/users/" + username;
        fetch(url)
            .then(response => response.json())
            .then(data => {data_printer(data, username, "new");})
            .catch(error => {
                // Handling connection errors
                if(error.message.toString() == "Failed to fetch"){
                    let error_div = document.getElementById("user_full_name");
                    error_div.style.color = "red";
                    error_div.innerHTML = "Unable to connect to " + "https://api.github.com!";
                    document.getElementById("user_image").src = "Connection_Error_Image.png";
                    document.getElementById("user_blog_address").innerHTML = "";
                    document.getElementById("user_location").innerHTML = "";
                    document.getElementById("user_bio_block").innerHTML = "";
                    document.getElementById("user_favorite_language").innerHTML = "";
                    // Removing last user-unavailable local storage messages
                    if(document.getElementById("local_storage_message") != null){
                        document.getElementById("local_storage_message").remove();

                    }
                    // Removing last user-unavailable message
                    if(document.getElementById("user_unavailable_block") != null){
                        document.getElementById("user_unavailable_block").remove();

                    }


                }

            });

    }

}


// This function receives the webpage programmer Github info (Username: Morteza-Damghani-Nouri)
function developer_profile_info_getter(username) {
    fetch_sender(username);

}

// This function is a handler for Submit button click event
function button_click_handler(){
    let username = document.getElementById("search_bar").value;
    if(username != ""){
        fetch_sender(username);
    }

}


























