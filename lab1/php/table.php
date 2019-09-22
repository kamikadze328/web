<?php foreach ($_SESSION['history'] as $value) { ?>
    <div class="table-row">
        <div class="table-data"><?php echo $value[0] ?></div>
        <div class="table-data"><?php echo $value[1] ?></div>
        <div class="table-data"><?php echo $value[2] ?></div>
        <div class="table-data"><?php echo $value[3] ?></div>
        <div class="table-data"><?php echo $value[4] ?></div>
        <div class="table-data"><?php echo number_format($value[5], 10, ".", "")*1000000 ?></div>
    </div>
<?php }?>