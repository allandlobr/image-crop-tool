This repository was created following CodeDrops #53 video on Rocketseat youtube channel. It is an image crop tool created using HTML, CSS and Vanilla Javascript. Only intention is to study and improve my knowledge in plain javascript.

Things to fix and improve ( i will list here some todos, so i don't forget):

- Right now, the selection can only be made from up-down, left-right. Add the possibility to select down-up and right-left, basically allowing the user to freely select the area to crop.

- The cropping area is not contained into the "photo-preview" container, if you select and scrool down or up, the selected area will leave the image area. Needs to fix it.

- The selection area doesn't count an image-area, when you try re-select starting from a point inside an already existing selecion area, it will not work, also when you try to "reduce" the selected area moving the cursor "back" it will not work, since the mouseover event won't be triggered. Needs to find a way to make the "selection div" works the same way as the image-area.