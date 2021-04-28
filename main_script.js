// This function receives the webpage programmer Github info (Username: Morteza-Damghani-Nouri)
function developer_profile_info_getter() {
    fetch("https://api.github.com/users/Morteza-Damghani-Nouri")
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
                document.getElementById("user_blog_address").innerHTML = data.blog;

            }
            else{
                document.getElementById("user_blog_address").innerHTML = "blog address unavailable";

            }
            if(data.location != null){
                document.getElementById("user_location").innerHTML = data.location;

            }
            else{
                document.getElementById("user_location").innerHTML = "location unavailable";

            }
            let user_bio_block_element = document.getElementById("user_bio_block");
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


































