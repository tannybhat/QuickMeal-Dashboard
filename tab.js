
function initViz() {
    var containerDiv = document.getElementById("vizContainer"),
    url = "https://public.tableau.com/views/Country_wise_distribution/Competitors?:display_count=y&:origin=viz_share_link";
    options = {
        hideTabs: false,
                            hideToolbar: true,
        onFirstInteractive: function () {
            console.log("Run this code when the viz has finished loading.");
            //workbook = viz.getWorkbook();
        }
    };

    var viz = new tableau.Viz(containerDiv, url,options);
}