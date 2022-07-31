/*
Embedded Boilerplate Maker

Kyle Heller, 7/17/22
Long Overdue
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void unhyphenate(char *str) {
  for (;*str != '\0';str++) {
    if (*str == '-') {
      *str = ' ';
    }
  }
}

int main(int argc, char **argv) {
  if (argc < 2) {
    printf("Usage: boil <pagename>\n\n");
  }
  else {
    char *pagename = argv[1];
    int len = strlen(pagename);
    char *pagedest = malloc((len + 6) * sizeof(char));
    strcpy(pagedest, pagename);
    unhyphenate(pagename);
    strcat(pagedest, ".html");
    FILE *page = fopen(pagedest, "w");
    fprintf(page, "<!DOCTYPE html><title>Killjoy-Dot-Com | %s</title><head><link rel='stylesheet' href='style.css'><link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap' rel='stylesheet'></head><body onload='add_style()'><div id='master'><table style='table-layout:auto;width:100%%;height:100%%;vertical-align:middle;width:99%%;'><tr width=100%%><th align='left'><div id='headerbar'><h1 id='banner'><b>KYLLJOY<br>DOT<br>COM</b></h1><br><h3 id='tagline'>Byproducts<br>Of A Strange Mind</h3></div></th><th style='width:100%%;'></th><th id='subheader'><div id='subheadercover'><table height=100%% style='padding-top:30px;padding-right:30px;'><tr><td><a href='index.html'>Home</a></td></tr><tr><td><a href='about.html'>About</a></td></tr><tr><td><a href='software.html'>Programs</a></td></tr><tr><td><a href='games.html'>Games</a></td></tr><tr><td><a href='misc.html'>Miscellaneous</a></td></tr><tr><td><a href='resume.html'>Resume</a></td></tr></table></div></th></tr></table><center><hr style='width:90%%;margin-top:30px'></center><center><h1>%s</h1></center><hr><div class='box-standard'><center>\n\n<h3>%% TITLE %%</h3></center><br><hr><br>\n\n%% CONTENT %%</div></div></div></body></html>", pagename, pagename);
    fclose(page);
    printf("Successfully created page '%s' at '%s'\n\n", pagename, pagedest);
  }

}
