import d3 from "../../d3-bundle";
import shortName from "../helpers/short-name";
import format from "../helpers/format";
import color from "../helpers/color";

function buildNodes() {
	var that = this;

	this.nodes = this.svg_g.append("g")
		.attr("class","nodes")
		.selectAll(".node")
		.data(this.graph.nodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	this.nodes.append("rect")
		.attr("height", function(d) {
			return Math.max(1, d.dy);
		})
		.attr("width", this.sankey.nodeWidth())
		.style("fill", (d) => {
			if (d.x < this.width / 2) {
				return color(shortName(d.sourceLinks[0].originregion_name));
			} else {
				return color(shortName(d.targetLinks[0].destinationregion_name));
			}
		})
		.attr("cursor", "pointer")
		.on("mouseover", function (d) {
			that.buildTooltip(d, this);
		})
		.on("mouseout", () => {
			d3.select("#widget-tooltip")
				.classed("hidden", true);
		})
		.on("click", (d) => {
			if (this.selectedCountry !== d.name) {
				this.selectedCountry = d.name;
			} else {
				this.selectedCountry = "";
			}

			this.topTenCheckbox.property("checked", false);

			this.updateAll();
		});

	return this;
}

export default buildNodes;