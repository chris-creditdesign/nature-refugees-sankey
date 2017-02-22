import d3 from "../../d3-bundle";
import shortName from "../helpers/short-name";
import format from "../helpers/format";

function buildLinks() {
	var that = this;

	function isSelected (elem) {
		if (that.selectedCountry.slice(-2) === "-o") {
			return elem.origin_name === that.selectedCountry;
		} else if (that.selectedCountry.slice(-2) === "-d") {
			return elem.destination_name === that.selectedCountry;
		} else {
			return true;
		}
	}

	var filterdLinks = this.graph.links.filter(isSelected);

	this.links = this.svg.selectAll(".link")
		.data(filterdLinks);

	// Enter	
	this.links.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", this.path)
		.style("stroke-width", function(d) {
			return Math.max(1, d.dy); // Set the stroke to the dy value - making sure it is at least 1
		})
		.style("stroke", (d) => {
			if (this.selectedCountry.length > 0) {
				return "url(#" + d.originregion_name + "-" + d.destinationregion_name + ")";
			} else {
				return "#000";
			}
		})
		.attr("opacity", () => {
			console.log(this.selectedCountry.length);
			return this.selectedCountry.length > 0 ? 1 : 0.1;
		});

	// Update
	this.links
		.attr("class", "link")
		.attr("d", this.path)
		.style("stroke-width", function(d) {
			return Math.max(1, d.dy); // Set the stroke to the dy value - making sure it is at least 1
		})
		.style("stroke", (d) => {
			if (this.selectedCountry.length > 0) {
				return "url(#" + d.originregion_name + "-" + d.destinationregion_name + ")";
			} else {
				return "#000";
			}
		})
		.attr("opacity", () => {
			console.log(this.selectedCountry.length);
			return this.selectedCountry.length > 0 ? 1 : 0.1;
		});

	// Exit
	this.links
		.exit()
		.remove();

	this.links.append("title")
		.text(function(d) {
			return shortName(d.origin_name) + " to " + shortName(d.destination_name) + "\n" + format(d.value);
		});

	return this;
}

export default buildLinks;