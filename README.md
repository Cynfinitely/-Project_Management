# -Project_Management

## TO-DO

- [X] Routes for frontend ( jacob )
- [X] Navbar ( Norah )
  - [ ] Links
  - [X] styling
  - [ ] User name in navbar instead of signup and register
- [X] Footer ( jacob )
  - [X] Styling

- [ ] Authentication ( Daniel )
  - [x] Login Page ( Signup / Register )
  - [X] Token
  - [ ] normal user ,  HI username !

- [X] Dashboard ( Daniel )
  - [X] Display projects
    - [X] Get projects by user ( Daniel)
    - [x] Add project and list in there ( Daniel)
  - [X] Project page
    - [X] Tasks
    - [X] Popup page for each task
    - [X] IT : delete and move tasks 

- [X] Popup page (Daniel )
- [X] track progress on projects. ( Jacob )

## If we have time:

- [ ]  attachments to tasks.
- [ ]  receive reminders.
- [ ]  assign them to other users.
- [ ] Write tests for your code to ensure it is working correctly. ( Celal )
- [ ] Use a task runner such as webpack or gulp. (Celal )

- [X] Styling ( Danyil Kokhenko) ( CELAL )
  - [X] General Styling
  - [X] Page Styling
  - [X] Navbar
  - [X] Footer

- [X] Server side ( Norah )
  - [X] Models ( Norah )
    - [X] Users
      - [X] full name
      - [X] e mail
      - [X] password
      - [X] is_admin
    - [X] Project
      - [X] name
      - [X] tasks ( foreign key )
      - [X] users ( foreign key )
    - [X] Tasks
      - [X] name
      - [X] description
      - [X] is_complated
      - [X] due dates
      - [X] assigned user ( foreign key)
    - [X] Comments
      - [X] description
      - [X] users ( foreign key)
      - [X] tasks ( foreign key)

  - [X] Routes ( Norah )
    - [X] get projects
    - [X] create project
    - [X] add projects
    - [X] delete projects
    - [X] get project by id
    - [X] create task
    - [X] delete task
    - [X] update task
    - [X] get task
    - [X] user routes
    - [X] create comment
    - [X] delete comment
    - [X] update comment
    - [X] get comment
  - [X] Controllers
  - [x] package.json ( Celal )



## TECH 

- Yarn
- Frontend:
  - React
  - Redux Toolkit
  - Tailwind CSs
- Backend:
  - mongodb
  - express
  - cors
  - dotenv
