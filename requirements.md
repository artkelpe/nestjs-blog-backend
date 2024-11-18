# User roles
* Guest - unauthorized user
* Admin - logged in user

# Functional requirements (completed)
* FR1: **Any user** can see list of all posts
* FR2: **Any user** can see any existing post 
* FR3: **Any user** can see comments (and their ratings) for any existing post 
* FR4: **Guest** can leave comment under any existing post
* FR5: **Guest** can vote '+1' or '-1' for any comment, but only once - check by IP
* FR6: **Guest** can vote only once for each comment, but can change his vote or remove 
it (in case of misclicking)
* FR7: **User** can log in into system just by password (no login needed) and become an **Admin**
* FR8: **Admin** can log out
* FR9: **Admin** can create new post
* FR10: **Admin** can edit any existing post
* FR11: **Admin** can delete any existing post
* FR12: **Admin** can delete any existing comment
* FR13: IP addresses of comment authors should be hidden as it is sensitive information

# Functional requirements (can be potentially implemented)
* FR100: Add new user role - **authorised user** (with nickname, profile and rating sum of his comments), with same abilities as **Guest**
* FR101: **Authorised user** can leave comment under his nickname
* FR102: **Guests** can reply to comment - create "tree" of comments
* FR103: List of comments can be sorted by creation date or by rating 