enyo.kind({
	name: "footer",
	kind: "Control",
	components: [
		{tag: "hr"},
		{tag: "footer", components: [
			{tag: "p", components: [
				{classes: "pull-left", components: [
					{content: "Built for the <a href='http://enyohackathon.com' target='_blank'>Enyo International Hackathon</a>."},
				]},
				{classes: "pull-right", content: "Built using <a href='http://enyojs.com' target='_blank'>Enyo</a> and <a href='http://twitter.github.com/bootstrap/' target='_blank'>Bootstrap</a>."}
			]},
		]}
	]
});
