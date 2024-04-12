<?php get_header(); ?>
   <div id="filler" class="fix">
    <div id="mainColumn">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
     <div id="post-<?php the_ID(); ?>" class="post">
      <div class="postMeta">
       <p class="container"><span class="date"><?php the_time('Y-m-d') ?></span><span class="comments"><?php comments_popup_link('0', '1', '%'); ?></span></p>
      </div>
      <h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title() ?></a></h2>
      <div class="entry"><?php the_content('Selengkapnya... &raquo;'); ?></div>
     </div>
<?php endwhile; ?>
<?php else : ?>
     <div class="post">
      <div class="postMeta">
       <p class="container"><span class="date">Tidak Ada</span></p>
      </div>
      <h2>Hasil pencarian : Tidak ada</h2>
      <div class="entry"><p>Anda terlihat sedang menuju tautan yang hilang atau mencari sesuatu yang tanpa hasil di blog ini. Silakan coba kembali. Jika anda merasa bahwa Anda sebaiknya memberi tanda, silakan kirim ke email pemilik blog atau silakan cari di arsip.</p></div>
     </div>
<?php endif; ?>
     <div id="paginateIndex" class="fix">
      <p><span class="left"><?php previous_posts_link('&laquo; Sebelumnya') ?></span> <span class="right"><?php next_posts_link('Selanjutnya &raquo;') ?></span></p>
     </div>
    </div>
<?php include (TEMPLATEPATH . '/second.column.index.php'); ?>
<?php include (TEMPLATEPATH . '/third.column.shared.php'); ?>
   </div>
<?php get_footer(); ?>
