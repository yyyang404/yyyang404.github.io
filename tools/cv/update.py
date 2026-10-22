#!/usr/bin/env python3
"""Copy a dated English CV into the homepage archive and latest download."""

import argparse
from pathlib import Path
import re
import shutil


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf", type=Path, help="CV_Mingyu_Ouyang_YYYYMM.pdf")
    args = parser.parse_args()
    source = args.pdf.resolve()
    if not source.is_file():
        parser.error(f"PDF not found: {source}")
    if not re.fullmatch(r"CV_Mingyu_Ouyang_\d{6}\.pdf", source.name):
        parser.error("Expected a dated PDF named CV_Mingyu_Ouyang_YYYYMM.pdf")

    destination = Path(__file__).resolve().parents[2] / "assets" / "cv"
    destination.mkdir(parents=True, exist_ok=True)
    archive = destination / source.name
    if source != archive:
        shutil.copy2(source, archive)
    shutil.copy2(archive, destination / "CV_Mingyu_Ouyang_latest.pdf")
    print(f"Updated {archive.name} and CV_Mingyu_Ouyang_latest.pdf")


if __name__ == "__main__":
    main()
