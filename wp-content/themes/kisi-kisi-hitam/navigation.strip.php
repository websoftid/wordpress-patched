   <div class="navStripWrapper">

    <ul class="nav fix">
     <li><a href="<?php echo get_settings('home'); ?>/" title="Ke Halaman Awal">Beranda<br /><span>Kembali ke Beranda</span></a></li>
     <li><a id="triggerCatID" href="#" title="Lihat Kategori">Lihat Arsip<br /><span>Sesuai Urutan Topic</span></a></li>
     <li class="last"><a href="<?php bloginfo('rss2_url'); ?>" title="Daftar RSS">Ikuti Blog<br /><span>Umpan RSS</span></a></li>
     <li id="searchBar1" class="searchField">

     <div>
      <form method="get" id="searchForm1" action="<?php bloginfo('home'); ?>/">
       <span><input type="text" value="Cari di Arsip..." onfocus="if (this.value == 'Cari di Arsip...') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Cari di Arsip...';}" name="s" id="s1" /></span>
      </form>
     </div>

     </li>
    </ul>

    <div id="headerStrip" class="toggleCategories fix" style="display: none;"> 
     <ul class="fix">
      <?php wp_list_cats('sort_column=name&optioncount=0&exclude=10, 15'); ?>
     </ul>
    </div>

   </div>
