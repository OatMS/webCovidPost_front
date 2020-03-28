<template>
   <div>
      <!-- <p @click.start="onmousedown" @click.stop="onmouseup"> สวัสดี ดดดดดดดดดดดดดดเเเเเเเเเเเเเเเกกกกกกกกกกกกกกกกกกก</p> -->
   <p>
Hello
<br>
      {{envja}}

   </p>
   
   
   
   </div>
    
</template>
<script>
export default {

   data(){
      return{
         mouseXPosition: 0,
         envja:process.env.VUE_APP_URL_API

      }
   },
   methods:{
      // getSafeRanges(dangerous) {
      //    var a = dangerous.commonAncestorContainer;
      //    // Starts -- Work inward from the start, selecting the largest safe range
      //    var s = new Array(0), rs = new Array(0);
      //    if (dangerous.startContainer != a){
      //       for(var i = dangerous.startContainer; i != a; i = i.parentNode){
      //          s.push(i);
      //       }
      //    }
            
      //    if (0 < s.length) for(var i = 0; i < s.length; i++) {
      //       var xs = document.createRange();
      //       if (i) {
      //          xs.setStartAfter(s[i-1]);
      //          xs.setEndAfter(s[i].lastChild);
      //       }
      //       else {
      //          xs.setStart(s[i], dangerous.startOffset);
      //          xs.setEndAfter(
      //             (s[i].nodeType == Node.TEXT_NODE)
      //             ? s[i] : s[i].lastChild
      //          );
      //       }
      //       rs.push(xs);
      //    }

      //    // Ends -- basically the same code reversed
      //    var e = new Array(0), re = new Array(0);
      //    if (dangerous.endContainer != a)
      //       for(var i = dangerous.endContainer; i != a; i = i.parentNode){
      //          e.push(i);
      //       }
      //    if (0 < e.length) for(var i = 0; i < e.length; i++) {
      //       var xe = document.createRange();
      //       if (i) {
      //          xe.setStartBefore(e[i].firstChild);
      //          xe.setEndBefore(e[i-1]);
      //       }
      //       else {
      //          xe.setStartBefore(
      //             (e[i].nodeType == Node.TEXT_NODE)
      //             ? e[i] : e[i].firstChild
      //          );
      //          xe.setEnd(e[i], dangerous.endOffset);
      //       }
      //       re.unshift(xe);
      //    }

      //    // Middle -- the uncaptured middle
      //    if ((0 < s.length) && (0 < e.length)) {
      //       var xm = document.createRange();
      //       xm.setStartAfter(s[s.length - 1]);
      //       xm.setEndBefore(e[e.length - 1]);
      //    }
      //    else {
      //       return [dangerous];
      //    }

      //    // Concat
      //    rs.push(xm);
      //    response = rs.concat(re);    

      //    // Send to Console
      //    return response;
      // },
      // highlightSelection() {
      //    var userSelection = window.getSelection().getRangeAt(0);
      //    var safeRanges = this.getSafeRanges(userSelection);
      //    for (var i = 0; i < safeRanges.length; i++) {
      //       this.highlightRange(safeRanges[i]);
      //    }
      // },
      // highlightRange(range) {
      //    var newNode = document.createElement("div");
      //    newNode.setAttribute(
      //       "style",
      //       "background-color: yellow; display: inline;"
      //    );
      //    range.surroundContents(newNode);
      // }
      onmousedown(e1){
         this.mouseXPosition = e1.pageX;//register the mouse down position
      },
      onmouseup (e2) {
         var highlighted = false;
         var selection = window.getSelection();
         var selectedText = selection.toString();
         var startPoint = window.getSelection().getRangeAt(0).startOffset;
         var endPoint = window.getSelection().getRangeAt(0).endOffset;
         var anchorTag = selection.anchorNode.parentNode;
         var focusTag = selection.focusNode.parentNode;
         if ((e2.pageX - this.mouseXPosition) < 0) {
            focusTag = selection.anchorNode.parentNode;
            anchorTag = selection.focusNode.parentNode;
         }
         if (selectedText.length === (endPoint - startPoint)) {
            highlighted = true;

            if (anchorTag.className !== "highlight") {
                  this.highlightSelection();
            } else {
                  var afterText = selectedText + "<span class = 'highlight'>" + anchorTag.innerHTML.substr(endPoint) + "</span>";
                  anchorTag.innerHTML = anchorTag.innerHTML.substr(0, startPoint);
                  anchorTag.insertAdjacentHTML('afterend', afterText);
            }

         }else{
            if(anchorTag.className !== "highlight" && focusTag.className !== "highlight"){
                  this.highlightSelection();  
                  highlighted = true;
            }
            
         }


         if (anchorTag.className === "highlight" && focusTag.className === 'highlight' && !highlighted) {
            highlighted = true;

            var afterHtml = anchorTag.innerHTML.substr(startPoint);
            var outerHtml = selectedText.substr(afterHtml.length, selectedText.length - endPoint - afterHtml.length);
            var anchorInnerhtml = anchorTag.innerHTML.substr(0, startPoint);
            var focusInnerHtml = focusTag.innerHTML.substr(endPoint);
            var focusBeforeHtml = focusTag.innerHTML.substr(0, endPoint);
            selection.deleteFromDocument();
            anchorTag.innerHTML = anchorInnerhtml;
            focusTag.innerHTml = focusInnerHtml;
            var anchorafterHtml = afterHtml + outerHtml + focusBeforeHtml;
            anchorTag.insertAdjacentHTML('afterend', anchorafterHtml);


         }

         if (anchorTag.className === "highlight" && !highlighted) {
            highlighted = true;
         var Innerhtml = anchorTag.innerHTML.substr(0, startPoint);
               var afterHtml = anchorTag.innerHTML.substr(startPoint);
               var outerHtml = selectedText.substr(afterHtml.length, selectedText.length);
               selection.deleteFromDocument();
               anchorTag.innerHTML = Innerhtml;
               anchorTag.insertAdjacentHTML('afterend', afterHtml + outerHtml);
            }
            
            if (focusTag.className === 'highlight' && !highlighted) {
               highlighted = true;
         var beforeHtml = focusTag.innerHTML.substr(0, endPoint);
            var outerHtml = selectedText.substr(0, selectedText.length - beforeHtml.length);
            selection.deleteFromDocument();
            focusTag.innerHTml = focusTag.innerHTML.substr(endPoint);
            outerHtml += beforeHtml;
            focusTag.insertAdjacentHTML('beforebegin', outerHtml );


         }
         if (!highlighted) {
            this.highlightSelection();
         }
         // $('.highlight').each(function(){
         //    if($(this).html() == ''){
         //          $(this).remove();
         //    }
         // });
         selection.removeAllRanges();
      },
      highlightSelection() {
         var selection;

         //Get the selected stuff
         if (window.getSelection)
            selection = window.getSelection();
         else if (typeof document.selection != "undefined")
            selection = document.selection;

         //Get a the selected content, in a range object
         var range = selection.getRangeAt(0);

         //If the range spans some text, and inside a tag, set its css class.
         if (range && !selection.isCollapsed) {
            if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
               var span = document.createElement('span');
               span.className = 'highlight';
               span.textContent = selection.toString();
               selection.deleteFromDocument();
               range.insertNode(span);
   //                        range.surroundContents(span);
            }
      }
}


   }

}


</script>

<style lang="scss" scoped>

</style>