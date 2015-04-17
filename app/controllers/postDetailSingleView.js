var args = arguments[0] || {};

//Ti.API.info("**** P_POST *******: "+JSON.stringify(args.p_post));

var post = args.p_post;

$.cat_icon_container.backgroundColor = post.cat_color;
$.catIcon.text = post.catImage;
$.titolo.text = post.name;
$.cat_mini_icon.text = post.catMiniIcon;
$.category.text = post.categoria;
$.data_post.text = post.postDate;

$.event_icon.text = post.iconEvent;
$.event_icon.width = post.iconEventWidth;
$.event_icon.left = post.iconEventLeft;

$.cashflow_icon.text = post.iconCashFlow;
$.cashflow_icon.width = post.iconCashWidth;
$.cashflow_icon.left = post.iconCashLeft;

$.document_icon.text = post.iconDocument;
$.document_icon.width = post.iconDocWidth;
$.document_icon.left = post.iconDocLeft;

$.note_icon.text = post.iconNote;
$.note_icon.width = post.iconNoteWidth;
$.note_icon.left = post.iconNoteLeft;

$.link_icon.text = post.iconLink;
$.link_icon.width = post.iconLinktWidth;
$.link_icon.left = post.iconLinkLeft;

function setToEvent(){
	
};

function setToCashflow(){
	
};

function setToDocument(){
	
};

function setToNote(){
	
};

function setToLink(){
	
};



