//$(document).ready(function(){
//	$(".rating").jRating({
//	  //isDisabled : true,
//		rateMax:5,
//		sendRequest:false,
//		step:true,
//		length : 5, // nb of stars
//		decimalLength:0, // number of decimal in the rate
//	});
//});
$(document).ready(function(){
	$('#page').val('1');
	filter();
});		

function addSearch(){
	var visibleSearch=document.getElementById("visibleSearch");
	var search=document.getElementById("search");
	search.value=visibleSearch.value;
	$('#page').val('1');
	filter();
}

function addCategory(val){
	if($("#category").val()==val){
		$("#category").val('');
	}
	else{
		$("#category").val(val);
	}
	//$('#skill').val('');
	$('#page').val('1');
	$('#categoryList li a').css("font-weight", "normal");
	if($("#category").val()!='')el=document.getElementById(val).style.fontWeight="bold";
	filter();
}

function addSkill(val){
	if($("#skill").val()==val){
		$("#skill").val('');
	}
	else{
		$("#skill").val(val);
	}
	$('#page').val('1');
	$('#skillList li').css("background-color", "#ffffff");
	$('#skillList li').css("background-repeat", "no-repeat");
	$('#skillList li').css("background-image", "url("+contextPath+"/resources/merlin/images/icons/tag-10x10.png)");
	$('#skillList li').css("background-position", "5px center");
	if($("#skill").val()!='')
		el=document.getElementById(val).style.background="#f6f6f6 url("+contextPath+"/resources/merlin/images/icons/tag-10x10.png) no-repeat 5px center";
	filter();
}

function addOrder(item){
	
	$('#page').val('1');
	var itemSort = document.getElementById('itemSort');
	if(itemSort.value!=''){
		if(itemSort.value==item){
			var dirSort = document.getElementById('dirSort');
			if(dirSort.value=='' || dirSort.value=='desc'){
				$("#dirSort").val('asc');
			}
			else{
				$("#dirSort").val('desc');
			}
		}
		else{
			$("#itemSort").val(item);
			$("#dirSort").val('asc');
		}
	}
	else{
		$("#itemSort").val(item);
		$("#dirSort").val('asc');
	}	
	var dirSort = document.getElementById('dirSort');
	var itemSort = document.getElementById('itemSort');
	if(itemSort.value=='name'){
		$('#name').css("font-weight","bold");
		$('#rating').css("font-weight","normal");
		$('#jobs').css("font-weight","normal");
		$('#rating i').removeClass("icon-up-dir");
		$('#rating i').addClass("icon-down-dir");
		$('#jobs i').removeClass("icon-up-dir");
		$('#jobs i').addClass("icon-down-dir");
		if(dirSort.value=='asc'){
			$('#name i').removeClass("icon-up-dir");
			$('#name i').addClass("icon-down-dir");
			
		}
		else{
			$('#name i').removeClass("icon-down-dir");
			$('#name i').addClass("icon-up-dir");
			
		}
	}
	else{
		if(itemSort.value=='rating'){
			$('#name').css("font-weight","normal");
			$('#rating').css("font-weight","bold");
			$('#jobs').css("font-weight","normal");
			$('#name i').removeClass("icon-up-dir");
			$('#name i').addClass("icon-down-dir");
			$('#jobs i').removeClass("icon-up-dir");
			$('#jobs i').addClass("icon-down-dir");
			if(dirSort.value=='asc'){
				$('#rating i').removeClass("icon-up-dir");
				$('#rating i').addClass("icon-down-dir");
				
			}
			else{
				$('#rating i').removeClass("icon-down-dir");
				$('#rating i').addClass("icon-up-dir");
				
			}
		}
		else{
			$('#name').css("font-weight","normal");
			$('#rating').css("font-weight","normal");
			$('#jobs').css("font-weight","bold");
			$('#name i').removeClass("icon-up-dir");
			$('#name i').addClass("icon-down-dir");
			$('#rating i').removeClass("icon-up-dir");
			$('#rating i').addClass("icon-down-dir");
			if(dirSort.value=='asc'){
				$('#jobs i').removeClass("icon-up-dir");
				$('#jobs i').addClass("icon-down-dir");
				
			}
			else{
				$('#jobs i').removeClass("icon-down-dir");
				$('#jobs i').addClass("icon-up-dir");
				
			}
		}
	}
	filter();
}
function setPage(page){
	$('#page').val(page);
	filter();
}
function pagesCounter(itemsNumber){
	var pages;
	var itemsForPage=$('#itemsForPage').val();
	var mod = itemsNumber%itemsForPage;
	if(mod==0){
		pages=itemsNumber/itemsForPage;
	}
	else{
		pages=(itemsNumber-mod)/itemsForPage+1;
	}
	return pages;
}
function pager(itemsNumber){
	var pages = pagesCounter(itemsNumber);
	var page=$('#page').val();
	//alert(pages);
	var prev="";
	var next="";
	var html="<ul>";
	var pagerHtml="";
	if(pages==0){
		html+="";
	}
	else{
		if(pages==1){
			pagerHtml+='<li id="page1"><a href="javascript:setPage(1)">1</a></li>';
			html+=pagerHtml;
		}
		else{
			if(pages>5){
				if((parseInt(page)-2)>1){
					if(parseInt(page)+2<=parseInt(pages)){
						for(var i = parseInt(page)-2;i<=parseInt(page)+2;i++){
							pagerHtml+='<li id="page'+i+'"><a href="javascript:setPage('+i+')">'+i+'</a></li>';
						}
					}
					else{
						for(var i = pages-4;i<=pages;i++){
							pagerHtml+='<li id="page'+i+'"><a href="javascript:setPage('+i+')">'+i+'</a></li>';
						}
					}
				}
				else{
					for(var i = 1;i<=5;i++){
						pagerHtml+='<li id="page'+i+'"><a href="javascript:setPage('+i+')">'+i+'</a></li>';
					}
				}
			}
			else{
				for(var i = 1;i<=pages;i++){
					pagerHtml+='<li id="page'+i+'"><a href="javascript:setPage('+i+')">'+i+'</a></li>';
				}
			}
			var nextPage=1+parseInt(page);
			next='<li><a class="next" href="javascript:setPage('+ nextPage +')">Next >></a></li>';
			if(page==1){
				html+=pagerHtml+next;
			}
			else{
				var prevPage=parseInt(page)-1;
				prev='<li><a class="previous" href="javascript:setPage('+prevPage+')"><< Previous</a></li>';
				if(page==pages){
					html+=prev+pagerHtml;
				}
				else{
					html+=prev+pagerHtml+next;
				}
			}
		}
	}
	 return html+'</ul>';
}
function filter(){
	var dataForm = $("#filterDataForm").serialize();
	var loadImage='<img src="'+contextPath+'/resources/merlin/images/load1.gif" width="128px" height="128px"/>';
	$("#result").html(loadImage);
	$.ajax({
		url:contextPath+'/profiles/freelancer/findAllFreelancersFiltered',
		type:'POST',
		dataType:'json',
		data:dataForm,
		success:function(data){
			//$("#LoadingImage").hide();
			var html = "";
			var users=data.items;
			if(users.length==0){
				html+='<div class="twelve columns">' +
				'<div class="notification error">'+
				'<img src="'+contextPath+'/resources/merlin/images/icons/error.png" alt="">'+
				'<p>'+notfound+'</p></div></div>';
			}
			else{
				for(var i = 0; i < users.length; i++){
					if(users[i].freelanceProfile.image == null){
						imagePath=contextPath+'/resources/images/avatar_default.png';
					}
					else{
						imagePath=contextPath+"/files/image/freelancer/"+users[i].freelanceProfile.image.fileID;
					}
					html+='<div class="twelve columns add-bottom bottom-bordered">'+
					'<div class="freelancerList_imgHolder"><img src="'+imagePath+'"></div>'+
					'<div class="freelancers-item-grid profile-img">'+
					'<div>'+ 
					'<h5> <a href="'+contextPath+'/profiles/freelancer/views?userID='+users[i].userID+'"> '+users[i].freelanceProfile.freelanceName+'</a> </h5>'+	
					'<span>'+users[i].freelanceProfile.category.name+'&nbsp;&nbsp;&nbsp;</span>'+
					'<span>'+jobs+': '+users[i].freelanceProfile.totalProjects+'</span>'+
					'<div class="rating" data-average="'+users[i].freelanceProfile.rating+'" data-id="4"></div>'+
					'</div><!-- end .blog_list_item_description -->'+
					'</div>'+
					'<div class="freelancers-item-grid">'+
					'<ul class="tagList">';
					for ( var j = 0; j < users[i].freelanceProfile.curriculum.cvSkills.length; j++) {
						html+="<li>"+users[i].freelanceProfile.curriculum.cvSkills[j].name+"</li>";
					}
					html+='</ul>'+
					'</div>'+
					'</div>';
				}
			}
			$(".sidebar").css('min-height', function(){
				return $('#itemsForPage').val()*120;
			});
			$('#result').html(html);
			var pagerHtml=pager(data.totalItems);
			$('#pagination').html(pagerHtml);
			var pageCurrent = $('#page').val();
			$('#page'+pageCurrent+' a').addClass('current');
			$('#counter').html(result+": "+data.totalItems+" "+elements+" in "+pagesCounter(data.totalItems)+" "+page_message);
			$(".rating").jRating({
				  isDisabled : true,
				  rateMax:5,
				  length:5,
				  decimalLength:1
			});
		  }
	});
}