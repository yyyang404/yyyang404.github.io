# CV downloads

The homepage CV button uses the stable URL:

https://mingyuouyang.com/assets/cv/CV_Mingyu_Ouyang_latest.pdf

Dated versions live alongside it as `assets/cv/CV_Mingyu_Ouyang_YYYYMM.pdf`.
Keep existing archive files so previously shared links remain accessible.

After compiling the CV, run from the main workspace repository:

```sh
python3 homepage/tools/cv/update.py cv/output/pdf/CV_Mingyu_Ouyang_202610.pdf
```

The script copies the PDF into the homepage assets under both its dated name
and `CV_Mingyu_Ouyang_latest.pdf`. For a new month, pass that month's filename.

Publish the updated PDFs and CV link to `yyyang404/yyyang404.github.io`.
The public `latest` URL updates once the GitHub Pages deployment completes.
