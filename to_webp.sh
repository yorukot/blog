#!/usr/bin/env bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Supported image formats
SUPPORTED_FORMATS=("png" "jpg" "jpeg" "bmp" "tiff" "tif" "gif")

# Check if cwebp is installed
check_cwebp() {
    if ! command -v cwebp &> /dev/null; then
        echo -e "${RED}Error: cwebp command not found${NC}"
        echo -e "${YELLOW}Please install webp tools first:${NC}"
        echo "  macOS: brew install webp"
        echo "  Ubuntu/Debian: sudo apt-get install webp"
        echo "  CentOS/RHEL: sudo yum install libwebp-tools"
        exit 1
    fi
}

# Show help message
show_help() {
    echo -e "${BLUE}Image to WebP Converter${NC}"
    echo ""
    echo "Usage: $0 [OPTIONS] [DIRECTORY]"
    echo ""
    echo "Options:"
    echo "  -q, --quality NUM    Set quality (0-100, default: 80)"
    echo "  -r, --recursive      Process subdirectories recursively"
    echo "  -d, --delete         Delete original files after conversion"
    echo "  -o, --output DIR     Specify output directory"
    echo "  -f, --formats LIST   Comma-separated list of formats to convert"
    echo "                       (default: png,jpg,jpeg,bmp,tiff,tif,gif)"
    echo "  -h, --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                              # Convert images in current directory"
    echo "  $0 -r ./images                 # Recursively convert images directory"
    echo "  $0 -q 90 -d ./photos           # High quality conversion and delete originals"
    echo "  $0 -o ./webp_output ./src       # Output to specified directory"
    echo "  $0 -f png,jpg ./gallery        # Only convert PNG and JPG files"
    echo ""
    echo "Supported formats: ${SUPPORTED_FORMATS[*]}"
}

# Default parameters
QUALITY=80
RECURSIVE=false
DELETE_ORIGINAL=false
OUTPUT_DIR=""
INPUT_DIR="."
FORMATS_TO_CONVERT=("${SUPPORTED_FORMATS[@]}")

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -q|--quality)
            QUALITY="$2"
            if [[ ! "$QUALITY" =~ ^[0-9]+$ ]] || [[ "$QUALITY" -lt 0 ]] || [[ "$QUALITY" -gt 100 ]]; then
                echo -e "${RED}Error: Quality must be a number between 0-100${NC}"
                exit 1
            fi
            shift 2
            ;;
        -r|--recursive)
            RECURSIVE=true
            shift
            ;;
        -d|--delete)
            DELETE_ORIGINAL=true
            shift
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -f|--formats)
            IFS=',' read -ra FORMATS_TO_CONVERT <<< "$2"
            # Validate formats
            for format in "${FORMATS_TO_CONVERT[@]}"; do
                if [[ ! " ${SUPPORTED_FORMATS[*]} " =~ " ${format,,} " ]]; then
                    echo -e "${RED}Error: Unsupported format '${format}'${NC}"
                    echo -e "${YELLOW}Supported formats: ${SUPPORTED_FORMATS[*]}${NC}"
                    exit 1
                fi
            done
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        -*)
            echo -e "${RED}Error: Unknown option $1${NC}"
            show_help
            exit 1
            ;;
        *)
            INPUT_DIR="$1"
            shift
            ;;
    esac
done

# Check if input directory exists
if [[ ! -d "$INPUT_DIR" ]]; then
    echo -e "${RED}Error: Directory '$INPUT_DIR' does not exist${NC}"
    exit 1
fi

# Create output directory if specified
if [[ -n "$OUTPUT_DIR" ]]; then
    mkdir -p "$OUTPUT_DIR"
    if [[ ! -d "$OUTPUT_DIR" ]]; then
        echo -e "${RED}Error: Cannot create output directory '$OUTPUT_DIR'${NC}"
        exit 1
    fi
fi

# Convert image to WebP
convert_to_webp() {
    local image_file="$1"
    local relative_path="$2"

    # Generate output path
    if [[ -n "$OUTPUT_DIR" ]]; then
        local output_path="$OUTPUT_DIR/$relative_path"
        local output_dir=$(dirname "$output_path")
        mkdir -p "$output_dir"
        local webp_file="${output_path%.*}.webp"
    else
        local webp_file="${image_file%.*}.webp"
    fi

    # Check if WebP file already exists
    if [[ -f "$webp_file" ]]; then
        echo -e "${YELLOW}Skipping: $webp_file already exists${NC}"
        return 0
    fi

    # Perform conversion
    echo -e "${BLUE}Converting: $image_file -> $webp_file${NC}"

    if cwebp -q "$QUALITY" "$image_file" -o "$webp_file" 2>/dev/null; then
        # Show file size comparison
        local original_size=$(stat -f%z "$image_file" 2>/dev/null || stat -c%s "$image_file" 2>/dev/null)
        local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)

        if [[ $original_size -gt 0 ]]; then
            local reduction=$(( (original_size - webp_size) * 100 / original_size ))
            local original_readable=$(numfmt --to=iec $original_size 2>/dev/null || echo "${original_size}B")
            local webp_readable=$(numfmt --to=iec $webp_size 2>/dev/null || echo "${webp_size}B")

            echo -e "${GREEN}✓ Success: File size reduced by ${reduction}% (${original_readable} -> ${webp_readable})${NC}"
        else
            echo -e "${GREEN}✓ Success: Converted to WebP${NC}"
        fi

        # Delete original file if specified
        if [[ "$DELETE_ORIGINAL" == true ]]; then
            rm "$image_file"
            echo -e "${YELLOW}Deleted original file: $image_file${NC}"
        fi

        return 0
    else
        echo -e "${RED}✗ Failed to convert: $image_file${NC}"
        return 1
    fi
}

# Main execution logic
main() {
    check_cwebp

    echo -e "${BLUE}=== Image to WebP Converter ===${NC}"
    echo -e "Input directory: ${INPUT_DIR}"
    echo -e "Quality setting: ${QUALITY}"
    echo -e "Recursive processing: $([ "$RECURSIVE" == true ] && echo "Yes" || echo "No")"
    echo -e "Delete originals: $([ "$DELETE_ORIGINAL" == true ] && echo "Yes" || echo "No")"
    echo -e "Formats to convert: ${FORMATS_TO_CONVERT[*]}"
    [[ -n "$OUTPUT_DIR" ]] && echo -e "Output directory: ${OUTPUT_DIR}"
    echo ""

    local converted=0
    local failed=0
    local total=0
    local skipped=0

    # Create temporary file to store image file list
    local temp_file=$(mktemp)

    # Find image files and write to temporary file
    > "$temp_file"  # Clear the temp file first

    for format in "${FORMATS_TO_CONVERT[@]}"; do
        if [[ "$RECURSIVE" == true ]]; then
            find "$INPUT_DIR" -type f -iname "*.${format}" -print0 >> "$temp_file"
        else
            find "$INPUT_DIR" -maxdepth 1 -type f -iname "*.${format}" -print0 >> "$temp_file"
        fi
    done

    # Process each image file
    while IFS= read -r -d '' image_file; do
        total=$((total + 1))

        # Calculate relative path
        local relative_path="${image_file#$INPUT_DIR/}"
        [[ "$relative_path" == "$image_file" ]] && relative_path=$(basename "$image_file")

        case $(convert_to_webp "$image_file" "$relative_path"; echo $?) in
            0)
                if [[ -f "${image_file%.*}.webp" ]] || [[ -n "$OUTPUT_DIR" && -f "$OUTPUT_DIR/${relative_path%.*}.webp" ]]; then
                    converted=$((converted + 1))
                else
                    skipped=$((skipped + 1))
                fi
                ;;
            *)
                failed=$((failed + 1))
                ;;
        esac

    done < "$temp_file"

    # Clean up temporary file
    rm -f "$temp_file"

    # Show result statistics
    echo ""
    echo -e "${BLUE}=== Conversion Complete ===${NC}"
    echo -e "Total processed: ${total} files"
    echo -e "${GREEN}Successfully converted: ${converted} files${NC}"
    [[ $skipped -gt 0 ]] && echo -e "${YELLOW}Skipped (already exists): ${skipped} files${NC}"
    [[ $failed -gt 0 ]] && echo -e "${RED}Failed conversions: ${failed} files${NC}"

    if [[ $total -eq 0 ]]; then
        echo -e "${YELLOW}No supported image files found in the specified directory${NC}"
        echo -e "Supported formats: ${SUPPORTED_FORMATS[*]}"
    fi
}

# Execute main program
main
