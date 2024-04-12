<!DOCTYPE html>
<html lang="id" dir="ltr" itemscope itemtype="http://schema.org/Article">

 <head>

  <link rel="dns-prefecth" href="//yht.web.id" />
  <link rel="dns-prefecth" href="//blog.yht.web.id" />
  <link rel="dns-prefecth" href="//kalamangga.net" />
  <link rel="dns-prefecth" href="//code.jquery.com" />

  <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
  <title><?php if (function_exists('is_tag') && is_tag()) { echo 'Posts tagged &quot;'.$tag.'&quot; - '; } elseif (is_archive()) { wp_title(''); echo ' Archive - '; } elseif (is_search()) { echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; } elseif (!(is_404()) && (is_single()) || (is_page())) { wp_title(''); echo ' - '; } elseif (is_404()) { echo 'Not Found - '; } bloginfo('name'); ?></title>
  <meta name="generator" content="gedit 3.4.2 & nano 2.2.6" />
  <meta name="author" content="Yudha H Tejaningrat" />

  <link rel="stylesheet" href="<?php echo CDNURL ?>/style.css" type="text/css" media="screen" />
  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />

  <script src="//code.jquery.com/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="<?php echo CDNURL ?>/js/functions.js" type="text/javascript" charset="utf-8"></script>

  <?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>
  <?php wp_head(); ?>

 </head>

 <body>
  <div id="wrapper">
   <div id="masthead" class="fix">
    <h1><a href="<?php echo get_settings('home'); ?>/"><?php bloginfo('name'); ?></a></h1>
    <div id="blogLead">
     <img src="<?php echo CDNURL ?>/images/avatar.png" alt="Icon" />
     <p id="authorIntro"><?php bloginfo('description'); ?></p>
    </div>
   </div>

<?php include (TEMPLATEPATH . '/navigation.strip.php'); ?>
