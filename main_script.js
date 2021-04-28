//This function sends fetch requests to get user info
function fetch_sender(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {

            if(data.avatar_url != null){
                document.getElementById("user_image").src = data.avatar_url;

            }
            else{
                document.getElementById("user_image").alt = "image unavailable";

            }
            if(data.name != null){
                document.getElementById("user_full_name").innerHTML = data.name;

            }
            else{
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


        })
        .catch();



}


// This function receives the webpage programmer Github info (Username: Morteza-Damghani-Nouri)
function developer_profile_info_getter(url) {
    fetch_sender(url);

}

function button_click_handler(){
    let username = document.getElementById("search_bar").value;
    if(username != ""){
        let url = "https://api.github.com/users/" + username;
        fetch_sender(url);
    }

}
































