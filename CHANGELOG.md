# Change Log

All notable changes to the "curly-scope-highlighter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added
- **Vertical Scope Highlighting**: New feature that highlights curly brackets themselves to provide clear visual scope boundaries
- Configuration options for vertical scope highlighting:
  - `curly-scope-highlighter.enableVerticalScope`: Enable/disable vertical scope highlighting (default: true)
  - `curly-scope-highlighter.verticalScopeColor`: RGB color for vertical scope highlighting (default: "0, 150, 150")
  - `curly-scope-highlighter.verticalScopeOpacity`: Opacity for vertical scope highlighting (default: 0.3)
- New `findVerticalScopes()` function to locate curly bracket positions
- Enhanced test coverage for vertical scope functionality

### Changed
- Improved highlighting system to support both horizontal (content inside braces) and vertical (curly brackets themselves) highlighting simultaneously
- Updated documentation to reflect new vertical scope highlighting feature

### Technical Details
- Vertical scope highlighting only applies to multi-line blocks (single-line braces are ignored)
- Maintains full backward compatibility with existing horizontal scope highlighting
- Configurable through VS Code settings with sensible defaults

- Initial release