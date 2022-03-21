function drawText(rc,ctx,s) {
  if(s.pos==="c"){
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label,Number(s.x), Number(s.y));
  }
  if(s.pos==="n"){
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(s.label,Number(s.x), Number(s.y)-0.5 * Number(s.size));
  }
  if(s.pos==="s"){
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(s.label,Number(s.x), Number(s.y)+0.5 * Number(s.size));
  }
  if(s.pos==="e"){
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label,Number(s.x)+0.5 * Number(s.size), Number(s.y));
  }
  if(s.pos==="w"){
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label,Number(s.x)-0.5 * Number(s.size), Number(s.y));
  }
}

function drawPoint(rc,ctx, s) {
  rc.circle(Number(s.x), Number(s.y), Number(s.size), {
    roughness: s.roughness,
    bowing: s.bowing,
    fill: s.fill,
    fillStyle: "solid",
    hachureGap: 4,
    fillWeight: 1,
    stroke: s.color,
    strokeWidth: 1
  });

  if(s.label!==""){
    drawText(rc,ctx,s)
  }

}

///////////////////////////////////////////////////////////////////////
function drawPoly(svg, rc, s) {
  svg.appendChild(rc.path(s.xy, {
     roughness: s.roughness,
     bowing: s.bowing,
     simplification: s.simplification,
     fill: s.fill,
     fillStyle: s.fillstyle,
     hachureAngle: s.hachureangle,
     hachureGap: s.hachuregap,
     fillWeight: s.fillweight,
     stroke: s.color,
     strokeWidth: s.size
   }));
}

function drawLine(svg, rc, s) {
  svg.appendChild(rc.path(s.xy, {
     roughness: s.roughness,
     bowing: s.bowing,
     stroke: s.color,
     strokeWidth: s.size,
     preserveVertices: s.preserveVertices
   }));
}

HTMLWidgets.widget({

  name: 'roughsf_svg',

  type: 'output',

  factory: function(el, width, height) {

    return {
      renderValue: function(x) {

        // Create Canvas element in DOM
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", x.id);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        el.appendChild(svg);

        // Insert rough canvas in the new canvas element
        const rc = rough.svg(svg);

        //Create context for text shape
        //const c = document.getElementById(x.id);
        //var ctx = c.getContext("2d");
        //ctx.font = x.font;

        //draw boarder
        //svg.appendChild(rc.rectangle (0, 0, width, height,{strokeWidth:2,roughness:3}));
        x.data.map(function(s) {
          if(s.shape === "POLYGON"){
            drawPoly(svg, rc, s);
          }
          if(s.shape === "LINESTRING"){
            drawLine(svg, rc, s);
          }



        });


      },
      resize: function(width, height) {
        // TODO
      }
    };
  }
});
