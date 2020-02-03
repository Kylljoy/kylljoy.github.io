function add_style(){
	var boxes= document.getElementsByClassName("textbox");
	for(box=0;box<boxes.length;box++){
		boxes[box].innerHTML="killjoy@desktop:~$ cat "+boxes[box].getAttribute("bxs")+".txt <br><br>"+boxes[box].innerHTML+"<br><br>killjoy@desktop:~$ ^C";
	}
	
	var boxes= document.getElementsByClassName("outbox");
	for(box=0;box<boxes.length;box++){
		boxes[box].innerHTML="killjoy@desktop:~$ cat <a href='"+boxes[box].getAttribute("bxl")+".html'>"+boxes[box].getAttribute("bxs")+".txt</a><br><br>"+boxes[box].innerHTML+"<br><br>killjoy@desktop:~$ ^C";
	}

}