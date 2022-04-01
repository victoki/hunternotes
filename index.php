<?php
    // This section defines the variables that will be used to
    // insert text into the top of the page..
    $title = "Hunter's Notes" ;
    $description = "A quick and simple reference guide for Monster Hunter Rise" ;
    $author = "Victoria King" ;
    $mainheading = "Hunter's Notes - A Monster Hunter Rise reference guide" ;
    
    // This puts the beginning part of the HTML file into the page
    include "includes/header.php" ;

    // This puts the HTML for the navigation into the page.
    include "includes/nav.php" ;
	
?>
<div class="main_container">
	<main class="invisible">
	
		<article id="main_nameplate">
			<img src="." alt="Monster Icon" class="header_icon">
			<h2>&nbsp;</h2>
			<section class="subheader">
				<h4>Monster Type</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		<article id="nameplate_data" class="dataflex">
			<h3>Details</h3>
			<section>
				<h4>Element</h4>
				<p>&nbsp;</p>
			</section>
			<section>
				<h4>Rank</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		
		<article id="weakness_nameplate">
			<img src="img/icon/header/bouncing_sword.png" alt="Bouncing Sword Icon" class="header_icon">
			<h2>Elements</h2>
			<section class="subheader">
				<h4>Best VS</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		<article id="element_data" class="dataflex">
			<h3>Data on Specific Element Weaknesses</h3>
			<section>
				<h4>Fire</h4>
				<p>&nbsp;</p>
				<h4>Ice</h4>
				<p>&nbsp;</p>
				<h4>Dragon</h4>
				<p>&nbsp;</p>
			</section>
			<section>
				<h4>Water</h4>
				<p>&nbsp;</p>
				<h4>Lightning</h4>
				<p>&nbsp;</p>
				<h4>Avoid VS</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		
		<article id="status_nameplate">
			<img src="img/icon/header/bubbling_flask.png" alt="Bubbling flask" class="header_icon">
			<h2>Status</h2>
			<section class="subheader">
				<h4>Best VS</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		<article id="status_data" class="dataflex">
			<h3>Data on Specific Status Afflictions</h3>
			<section>
				<h4>Poison</h4>
				<p>&nbsp;</p>
				<h4>Blast</h4>
				<p>&nbsp;</p>
				<h4>Stun</h4>
				<p>&nbsp;</p>
				<h4>Fireblight</h4>
				<p>&nbsp;</p>
				<h4>Thunderblight</h4>
				<p>&nbsp;</p>
				<h4>Sonic Bomb</h4>
				<p>&nbsp;</p>
				<h4>Traps</h4>
				<p>&nbsp;</p>
			</section>
			<section>
				<h4>Paralysis</h4>
				<p>&nbsp;</p>
				<h4>Sleep</h4>
				<p>&nbsp;</p>
				<h4>Exhaust</h4>
				<p>&nbsp;</p>
				<h4>Waterblight</h4>
				<p>&nbsp;</p>
				<h4>Iceblight</h4>
				<p>&nbsp;</p>
				<h4>Flash Bomb</h4>
				<p>&nbsp;</p>
				<h4>Monster Inflicts</h4>
				<p>&nbsp;</p>
			</section>
		</article>
		
		<article id="break_nameplate">
			<img src="img/icon/header/broken_skull.png" alt="Broken skull" class="header_icon">
			<h2>Body Parts</h2>
			<section class="subheader">
				<h4>Breakable parts</h4>
				<p>(...or cuttable)</p>
			</section>
		</article>
		<article id="break_data" class="dataflex">
			<h3>Details on parts</h3>
			<section>
				<h4>Breakable</h4>
				<p>&nbsp;</p>
			</section>
			<section>
				<h4>Severable</h4>
				<p>&nbsp;</p>
			</section>
		</article>
	</main>

	<aside class="invisible">
		<img src="." alt="Monster image" id="monster_img">
		<nav class="mat_tab_btn_container">
			<button class="mat_btn" id="mat_low_btn" type="button">Low Rank</button>
			<button class="mat_btn" id="mat_high_btn" type="button">High Rank</button>
			<button class="mat_btn" id="mat_spec_btn" type="button">Special</button>
		</nav>
		
		<article id="materials_low" class="mat_card">
			<img src="img/icon/header/ivory_tusks.png" alt="Tusks Icon" class="header_icon">
			<h2>Low Rank</h2>
			<h3>The following materials can be found in low rank.</h3>
		</article>
		
		<article id="materials_high" class="invisible mat_card">
			<img src="img/icon/header/ivory_tusks.png" alt="Tusks Icon" class="header_icon">
			<h2>High Rank</h2>
			<h3>The following materials can be found in high rank.</h3>
		</article>
		
		<article id="materials_spec" class="invisible mat_card_special">
			<img src="img/icon/header/ivory_tusks_s.png" alt="Tusks Icon" class="header_icon">
			<h2>Special</h2>
			<h3>This monster has materials gained through a special means.</h3>
			<section>
				<img src="." alt="Item Icon" id="spec_item_icon">
				<h4 class="mat_card_header">&nbsp;</h4>
			</section>
			<section>
				<h4>Source:</h4>
				<p class="source">&nbsp;</p>
			</section>
		</article>
	</aside>
</div>
<script src='js/scripts.js'></script>

<template id="mat_data">
	<section>
		<img class="icon_img" src="." alt="Item Icon">
		<h4 class="mat_card_header">&nbsp;</h4>
		<h4>Rarity:</h4>
		<p class="rarity">&nbsp;</p>
		<h4>Sources:</h4>
		<p class="source">&nbsp;</p>
		<h4>Best:</h4>
		<p class="best_source">&nbsp;</p>
	</section>
</template>

<?php
    // This puts the HTML for the footer into the page.
    include "includes/footer.php" ;
?>