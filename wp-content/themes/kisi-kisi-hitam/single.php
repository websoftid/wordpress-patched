<?php
/**
 *	@package WordPress
 *	@subpackage kisi-kisi-hitam
 */
get_header();
?>
<div id="filler" class="fix">
	<div id="singleColumn" class="fix"><a name="main"></a>
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div id="post-<?php the_ID(); ?>" class="post">
			<div class="postMeta fix">
				<p class="container">
					<span class="date"><?php the_time('M j, Y') ?><?php edit_post_link(' (Ubah)', '', ''); ?></span>
				</p>
			</div>
			<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title() ?></a></h2>
			<div class="entry">
				<?php the_content('<p>Selanjutnya... &raquo;</p>'); ?>
			</div>
			<div class="entry meta">
				<p><span class="highlight">Kategori:</span> <?php the_category(', ') ?></p>
				<p><span class="highlight">Tag:</span> <?php the_tags( '', ', ', ''); ?></p>
			</div>
		</div>
		<div id="commentsContainer">
			<?php comments_template(); ?>
		</div>
		<?php endwhile; else: ?>
		<div class="post">
			<h2>Tidak menemukan data.</h2>
			<div class="entry">
				<p>Anda terlihat sedang menuju tautan yang hilang atau mencari sesuatu yang tanpa hasil di blog ini. Silakan coba kembali. Jika anda merasa bahwa Anda sebaiknya memberi tanda, silakan kirim ke email pemilik blog atau silakan cari di arsip.</p>
			</div>
		</div>
		<?php endif; ?>
	</div>
	<?php include (TEMPLATEPATH . '/second.column.post.php'); ?>
</div>
<?php get_footer(); ?>